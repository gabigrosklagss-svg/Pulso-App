import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDatabase, migrate } from './database.js';
import { createAuth } from './auth.js';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));
const json = (res, status, body, headers = {}) => { res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...headers }); res.end(JSON.stringify(body)); };
const body = async (req) => { const chunks=[]; let size=0; for await (const chunk of req) { size += chunk.length; if (size > 32_768) throw Object.assign(new Error('Corpo muito grande.'), {status:413}); chunks.push(chunk); } try { return JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { throw Object.assign(new Error('JSON inválido.'), {status:400}); } };
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json' };

export function createApp(options = {}) {
  const db = options.db || openDatabase(); migrate(db);
  const origin = options.origin || process.env.APP_ORIGIN || 'http://localhost:3000';
  const auth = createAuth(db, { secret: options.secret || process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'development-only-secret-change-me-now'), secure: origin.startsWith('https://') });
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, origin);
      const unsafe = !['GET','HEAD','OPTIONS'].includes(req.method);
      if (unsafe && req.headers.origin && req.headers.origin !== origin) return json(res, 403, { error:'Origem não autorizada.' });
      const session = auth.sessionFrom(req);
      if (url.pathname === '/api/health') return json(res, 200, { status:'ok' });
      if (url.pathname === '/api/auth/register' && req.method === 'POST') return json(res, 201, { user: auth.register(await body(req)), verification:'pending' });
      if (url.pathname === '/api/auth/login' && req.method === 'POST') { const result=auth.login(await body(req)); return json(res, 200, {user:result.user}, {'set-cookie':result.cookie}); }
      if (url.pathname === '/api/auth/logout' && req.method === 'POST') return json(res, 200, {ok:true}, {'set-cookie':auth.logout(session)});
      if (url.pathname === '/api/me' && req.method === 'GET') return session ? json(res, 200, {user:session}) : json(res, 401, {error:'Autenticação necessária.'});
      if (url.pathname === '/api/me/theme' && req.method === 'PATCH') {
        if (!session) return json(res, 401, {error:'Autenticação necessária.'});
        const { theme } = await body(req); if (!['light','dark','system'].includes(theme)) return json(res, 422, {error:'Tema inválido.'});
        db.prepare('UPDATE profiles SET theme=?,updated_at=? WHERE user_id=?').run(theme,new Date().toISOString(),session.id);
        return json(res, 200, {theme});
      }
      if (url.pathname === '/api/admin/overview') {
        if (!session || session.role !== 'admin') return json(res, 403, {error:'Acesso administrativo negado.'});
        return json(res, 200, {users:db.prepare('SELECT count(*) total FROM users').get().total});
      }
      if (url.pathname.startsWith('/api/')) return json(res, 404, {error:'Recurso não encontrado.'});
      const candidate = url.pathname === '/' ? 'index.html' : normalize(url.pathname).replace(/^(\.\.(\/|\\|$))+/, '').replace(/^\//,'');
      const file = join(publicDir, candidate);
      if (!file.startsWith(publicDir)) return json(res, 404, {error:'Não encontrado.'});
      const content = await readFile(file); res.writeHead(200, {'content-type':mime[extname(file)] || 'application/octet-stream','x-content-type-options':'nosniff','content-security-policy':"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'",'referrer-policy':'no-referrer'}); res.end(content);
    } catch (error) {
      if (error?.code === 'ENOENT') return json(res, 404, {error:'Não encontrado.'});
      json(res, error.status || 500, {error:error.status ? error.message : 'Erro interno.'});
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000); createApp().listen(port, () => console.log(`Pulso disponível em http://localhost:${port}`));
}
