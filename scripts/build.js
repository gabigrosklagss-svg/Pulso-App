import { cpSync, mkdirSync, rmSync } from 'node:fs';
rmSync('dist',{recursive:true,force:true}); mkdirSync('dist'); cpSync('public','dist/public',{recursive:true}); cpSync('src','dist/src',{recursive:true}); cpSync('migrations','dist/migrations',{recursive:true}); console.log('Build criado em dist/.');
