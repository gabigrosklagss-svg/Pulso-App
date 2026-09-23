# Arquitetura

## Decisão atual

Monólito modular em Node.js 24, HTTP nativo e SQLite relacional. A escolha elimina dependências indisponíveis no ambiente e mantém um único limite de autorização. O navegador nunca acessa o banco. A migração futura para PostgreSQL deve preservar contratos e transações. Não há microserviços.

`src/server.js` concentra o adaptador HTTP; `src/auth.js`, autenticação; `src/database.js`, conexão/migrations; `public/`, cliente mobile; `migrations/`, esquema reproduzível. Datas são ISO-8601 UTC e valores monetários futuros serão inteiros em centavos.

## Segurança implementada

Senhas usam `scrypt` da biblioteca criptográfica do Node, com sal aleatório e comparação em tempo constante. Sessões têm token aleatório de 256 bits; somente hash SHA-256 com segredo do servidor fica no banco. Cookies são HttpOnly, SameSite=Lax e Secure em HTTPS. Operações mutáveis validam Origin, corpos têm limite, respostas têm CSP e `nosniff`. Consultas são parametrizadas. Papéis são `customer`, `business`, `reviewer`, `support` e `admin`; cadastro público sempre cria `customer`.

## Limites e próximas decisões

SQLite é adequado a desenvolvimento/teste e primeiro incremento, não à concorrência nacional. Antes de homologação comercial: PostgreSQL gerenciado, autenticação consolidada/provedor de e-mail, rotação/limpeza de sessões, rate limiting compartilhado, CSRF token de defesa adicional, armazenamento privado com URLs temporárias, observabilidade sem conteúdo sensível e backup testado.

O cache offline ainda não é instalado: o manifesto torna a interface instalável, mas não há service worker. Quando houver, somente shell e ativos versionados serão cacheados; chats, documentos, perfil, respostas de API e mídia privada serão excluídos.
