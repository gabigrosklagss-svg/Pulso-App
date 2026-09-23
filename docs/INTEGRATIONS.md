# Integrações

Todas as credenciais pertencem ao servidor e variam entre desenvolvimento, teste, homologação e produção. Os nomes estão em `.env.example`; valores reais não entram no Git.

| Área | Estado | Regra de falha segura |
|---|---|---|
| E-mail/verificação/recuperação | bloqueado por provedor | conta permanece não verificada; publicação proibida futuramente |
| Google OAuth | bloqueado por credenciais | opção não é exibida |
| Telefone | bloqueado por SMS | telefone permanece pendente |
| Identidade | bloqueado por fornecedor | nunca aceitar status do navegador nem autoaprovar |
| IA/transcrição | bloqueado por provedor | formulário manual funcional será o fallback |
| Consulta CNPJ | bloqueado por fornecedor | cadastro fica para revisão; não inventar situação cadastral |
| Assinatura | bloqueado por fornecedor | plano nunca ativa por retorno do navegador; somente webhook autenticado/idempotente |
| Storage | bloqueado por bucket | uploads privados não são oferecidos |
| Push/e-mail transacional | bloqueado | somente central interna futura, sem alegar envio externo |
| IBGE/CEP | pendente de dataset/API oficial | IDs serão persistidos e dados versionados; GPS será opcional |

Ao contratar: validar documentação oficial atual, limites e residência de dados; implementar assinatura de webhook, idempotência, timeouts e redaction; testar sandbox; registrar custo/latência/erro sem conteúdo sensível; promover credenciais separadamente.
