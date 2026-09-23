# Pulso

Aplicação web mobile-first que conecta consumidores a empresas verificadas no Brasil. Esta entrega estabelece a fundação executável; **não** representa o produto completo nem uma operação publicada.

## Requisitos e execução

- Node.js 24 ou superior (usa o SQLite estável distribuído no Node; não há dependências npm nesta etapa).
- Copie `.env.example` para `.env` e forneça um `SESSION_SECRET` aleatório com pelo menos 32 caracteres para qualquer ambiente compartilhado.

```bash
npm run db:migrate
npm start
# abra http://localhost:3000
```

Em desenvolvimento local, `npm run dev` habilita reinício automático. Dados ficam em `data/pulso.db`; sobrescreva `DATABASE_PATH` para outro caminho. Não use o banco de desenvolvimento em produção.

## O que funciona agora

- cadastro e login por e-mail/senha, sessão opaca HttpOnly, logout e bloqueio de origem;
- perfis isolados e autorização administrativa negada por padrão;
- preferência Claro/Escuro/Sistema local e sincronizada no perfil autenticado;
- shell mobile/PWA, navegação inferior e rascunho local não sensível de busca;
- migrations transacionais e testes automatizados da fundação.

E-mail de verificação, recuperação, Google OAuth, telefone e demais integrações dependem de provedores ainda não configurados; portanto permanecem explicitamente pendentes e nenhuma aprovação é simulada. Consulte `docs/PROGRESS.md`.

## Primeiro administrador

Não existe senha fixa nem autoelevação. Em homologação, após cadastrar e verificar a pessoa responsável por canal controlado, um operador com acesso ao banco executa uma atualização auditada segundo `docs/DEPLOYMENT.md`. Esse procedimento será substituído por CLI transacional antes da produção.

## Verificação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

A arquitetura, integrações e limites atuais estão detalhados em `docs/`.
