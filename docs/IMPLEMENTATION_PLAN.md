# Plano de implementação

Estados: **Não iniciado**, **Em implementação**, **Implementado sem validação**, **Validado no ambiente disponível**, **Bloqueado por dependência externa**.

1. **Fundação — Em implementação:** migrations, autenticação local, sessões, papéis, tokens visuais, temas e shell mobile validados. Faltam autenticação gerenciada, Google, e-mail/telefone, municípios IBGE e storage.
2. **Cliente e busca — Em implementação:** rascunho visitante preservado e separação de tabelas criada. Próximo incremento: conversa persistida, schema validado, fallback manual completo, confirmação/publicação e IA configurável.
3. **Empresas — Não iniciado:** cadastro em etapas, documentos privados, cobertura, representante e revisão com auditoria.
4. **Catálogo — Não iniciado:** schemas administrativos, anúncios de produto/serviço, mídia, limites e busca paginada.
5. **Oportunidades — Não iniciado:** elegibilidade determinística, convites, rodízio, reserva transacional das sete vagas e propostas versionadas.
6. **Negociação — Não iniciado:** apresentação, adaptador de identidade, aceite mútuo e chat com mídia restrita.
7. **Resultado — Não iniciado:** negócio, confirmações explícitas/idempotentes, QR opaco, avaliação e reputação.
8. **Gestão — Não iniciado:** assinatura por webhook, relatórios, notificações, suporte e administração mobile.
9. **Validação — Em implementação:** testes automatizados da fundação; faltam navegador, acessibilidade, carga, segurança e integrações reais.

Cada etapa exige interface + API + persistência + autorização + teste de risco para mudar a “Validado”. Dependências externas nunca serão aprovadas por flag de navegador.
