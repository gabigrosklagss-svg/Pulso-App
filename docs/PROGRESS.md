# Progresso

Atualizado em 2026-09-23.

## Concluído e validado no ambiente disponível

- Bootstrap sem dependências de terceiros, migration transacional e banco SQLite local.
- Cadastro e login por e-mail/senha, hash seguro, sessão opaca, logout, isolamento de perfil, tema e bloqueio administrativo.
- Shell mobile responsivo, navegação cliente, Claro/Escuro/Sistema, redução de movimento e persistência apropriada de tema/rascunho.
- Estrutura inicial que separa mensagens privadas, estado estruturado e dados confirmados.

## Parcial

- Autenticação: e-mail/senha funciona, mas verificação/recuperação, Google e telefone dependem de provedores.
- Busca: captura e preserva o primeiro rascunho; conversa de IA, formulário manual completo, publicação e resultados ainda não foram implementados.
- PWA: manifesto existe; service worker foi deliberadamente adiado até haver política/testes de cache.

## Bloqueios externos

O registro npm retornou HTTP 403, impedindo dependências consolidadas. Credenciais/provedores de e-mail, SMS, Google, identidade, IA/transcrição, CNPJ, cobrança, storage e push não estão configurados. Nenhuma integração foi simulada como real.

## Próxima ação concreta

Implementar Etapa 2 vertical: migrations de localidades e procuras publicadas, importador versionado de municípios do IBGE, endpoints autenticados, editor manual completo e confirmação explícita; depois integrar o provedor de IA no backend com saída Zod/JSON Schema assim que uma dependência validada estiver disponível.
