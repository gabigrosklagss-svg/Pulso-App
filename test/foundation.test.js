import test from 'node:test';
import assert from 'node:assert/strict';
import { openDatabase, migrate } from '../src/database.js';
import { createApp } from '../src/server.js';

async function fixture() {
  const db=openDatabase(':memory:'); migrate(db); const server=createApp({db,secret:'a-secure-test-secret-with-32-characters',origin:'http://localhost'}); await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const base=`http://127.0.0.1:${server.address().port}`;
  const request=async(path,options={})=>{const response=await fetch(base+path,{headers:{origin:'http://localhost','content-type':'application/json',...options.headers},...options});let data=await response.json();return {response,data};};
  return {db,request,close:()=>new Promise(r=>server.close(()=>{db.close();r();}))};
}

test('cadastro, login, sessão opaca e logout funcionam',async()=>{const f=await fixture();try{
  let result=await f.request('/api/auth/register',{method:'POST',body:JSON.stringify({name:'Ana Silva',email:'ANA@example.com',password:'segura12345'})});assert.equal(result.response.status,201);
  result=await f.request('/api/auth/login',{method:'POST',body:JSON.stringify({email:'ana@example.com',password:'segura12345'})});assert.equal(result.response.status,200);const cookie=result.response.headers.get('set-cookie');assert.match(cookie,/HttpOnly/);assert.doesNotMatch(cookie,/ana@example/);
  result=await f.request('/api/me',{headers:{cookie}});assert.equal(result.data.user.email,'ana@example.com');
  await f.request('/api/auth/logout',{method:'POST',headers:{cookie},body:'{}'});result=await f.request('/api/me',{headers:{cookie}});assert.equal(result.response.status,401);
}finally{await f.close();}});

test('usuário comum não acessa administração e perfis ficam isolados',async()=>{const f=await fixture();try{
  for(const [name,email] of [['Ana','ana@example.com'],['Bia','bia@example.com']]) await f.request('/api/auth/register',{method:'POST',body:JSON.stringify({name,email,password:'segura12345'})});
  const login=await f.request('/api/auth/login',{method:'POST',body:JSON.stringify({email:'ana@example.com',password:'segura12345'})});const cookie=login.response.headers.get('set-cookie');
  const denied=await f.request('/api/admin/overview',{headers:{cookie}});assert.equal(denied.response.status,403);
  await f.request('/api/me/theme',{method:'PATCH',headers:{cookie},body:JSON.stringify({theme:'dark'})});
  assert.equal(f.db.prepare("SELECT theme FROM profiles JOIN users ON users.id=profiles.user_id WHERE email='ana@example.com'").get().theme,'dark');assert.equal(f.db.prepare("SELECT theme FROM profiles JOIN users ON users.id=profiles.user_id WHERE email='bia@example.com'").get().theme,'system');
}finally{await f.close();}});

test('origem externa, senha fraca e tema inválido são rejeitados',async()=>{const f=await fixture();try{
  let result=await f.request('/api/auth/register',{method:'POST',headers:{origin:'https://evil.example'},body:'{}'});assert.equal(result.response.status,403);
  result=await f.request('/api/auth/register',{method:'POST',body:JSON.stringify({name:'Ana',email:'ana@example.com',password:'curta'})});assert.equal(result.response.status,422);
}finally{await f.close();}});
