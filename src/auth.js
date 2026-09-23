import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const COOKIE = 'pulso_session';
const normalizeEmail = (value) => String(value || '').trim().toLowerCase();
const sessionDigest = (token, secret) => createHash('sha256').update(`${secret}:${token}`).digest('hex');

export function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const digest = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString('hex');
  return `scrypt$16384$${salt}$${digest}`;
}

export function verifyPassword(password, encoded) {
  const [algorithm, cost, salt, digest] = String(encoded).split('$');
  if (algorithm !== 'scrypt' || cost !== '16384' || !salt || !digest) return false;
  const actual = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  const expected = Buffer.from(digest, 'hex');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createAuth(db, { secret, secure = false, ttlHours = 168 } = {}) {
  if (!secret || (process.env.NODE_ENV === 'production' && secret.length < 32)) throw new Error('SESSION_SECRET seguro é obrigatório');
  const cookie = (token, maxAge) => `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
  const sessionFrom = (request) => {
    const token = request.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
    if (!token) return null;
    return db.prepare(`SELECT s.id session_id, u.id, u.email, u.name, u.role, u.email_verified_at,
      p.phone_verified_at, p.theme FROM sessions s JOIN users u ON u.id=s.user_id
      LEFT JOIN profiles p ON p.user_id=u.id WHERE s.token_hash=? AND s.expires_at>?`).get(sessionDigest(token, secret), new Date().toISOString()) || null;
  };
  return {
    normalizeEmail,
    register({ email, password, name }) {
      email = normalizeEmail(email);
      if (!/^\S+@\S+\.\S+$/.test(email)) throw Object.assign(new Error('E-mail inválido.'), { status: 422 });
      if (typeof name !== 'string' || name.trim().length < 2) throw Object.assign(new Error('Informe seu nome.'), { status: 422 });
      if (typeof password !== 'string' || password.length < 10 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) throw Object.assign(new Error('Use pelo menos 10 caracteres, com letra e número.'), { status: 422 });
      const id = crypto.randomUUID();
      db.exec('BEGIN IMMEDIATE');
      try {
        db.prepare('INSERT INTO users (id,email,name,password_hash,role,created_at) VALUES (?,?,?,?,?,?)').run(id, email, name.trim(), hashPassword(password), 'customer', new Date().toISOString());
        db.prepare('INSERT INTO profiles (user_id,theme) VALUES (?,?)').run(id, 'system');
        db.exec('COMMIT');
      } catch (error) {
        db.exec('ROLLBACK');
        if (String(error).includes('UNIQUE')) throw Object.assign(new Error('Não foi possível criar a conta com esses dados.'), { status: 409 });
        throw error;
      }
      return { id, email, name: name.trim() };
    },
    login({ email, password }) {
      const user = db.prepare('SELECT * FROM users WHERE email=? AND blocked_at IS NULL').get(normalizeEmail(email));
      if (!user || !verifyPassword(String(password || ''), user.password_hash)) throw Object.assign(new Error('E-mail ou senha inválidos.'), { status: 401 });
      const token = randomBytes(32).toString('base64url');
      const expires = new Date(Date.now() + ttlHours * 3600000);
      db.prepare('INSERT INTO sessions (id,user_id,token_hash,expires_at,created_at) VALUES (?,?,?,?,?)').run(crypto.randomUUID(), user.id, sessionDigest(token, secret), expires.toISOString(), new Date().toISOString());
      return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, cookie: cookie(token, ttlHours * 3600) };
    },
    sessionFrom,
    logout(session) {
      if (session) db.prepare('DELETE FROM sessions WHERE id=?').run(session.session_id);
      return cookie('', 0);
    }
  };
}
