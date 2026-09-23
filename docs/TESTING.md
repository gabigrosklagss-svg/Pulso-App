# Testes

## Automatizados

`npm test` cobre cadastro/login/logout, cookie opaco HttpOnly, sessão, senha fraca, validação de Origin, bloqueio de usuário comum na administração, isolamento do tema entre perfis e invariantes essenciais da interface mobile. `npm run lint`, `npm run typecheck` e `npm run build` validam sintaxe e empacotamento reproduzível.

## Ainda não executados

- navegador real nos tamanhos 320/360/390/430, teclado, câmera, microfone, leitor de tela e instalação PWA;
- e-mail, OAuth, SMS, identidade, IA, storage, assinatura e push, pois faltam provedores/credenciais;
- critérios das Etapas 2–8 (sétima/oitava proposta concorrente, chat/mídia, QR, negócio, avaliação, webhook etc.), pois os recursos ainda não existem.

Mocks só serão usados em testes isolados e identificados como tal; não provarão integração externa.
