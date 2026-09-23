# Especificação normativa do Pulso

Este documento condensa a especificação recebida em 2026-09-23; o texto de origem continua sendo a referência em caso de dúvida. “Implementado” exige interface, servidor, persistência, autorização e validação pertinente — uma tela isolada não conclui recurso.

## Produto, território e experiência

Pulso conecta consumidores a empresas verificadas em todo o Brasil: necessidade conversada, resumo confirmado, anúncios/propostas, interesse mútuo, identidade, chat, negócio confirmado e avaliação. Não processa compras, repasses, carteira ou entrega; cobra somente assinatura empresarial. PT-BR, BRL em centavos, UTC armazenado e fuso explícito. Cobertura usa IDs estáveis de estados/municípios e respeita atendimento local/remoto, retirada, entrega/envio regional/nacional; GPS é opcional e endereço residencial não é distribuído.

Todas as áreas são mobile-first desde 320 px, sem rolagem horizontal, com navegação inferior, toque/áreas seguras, formulários em etapas, rascunho, estados completos, acessibilidade e redução de movimento. Tema Claro (#F5F8FC/#FFFFFF/#14263D) e Escuro (#0B1220/#152238/#F0F6FF), destaque #7DD3FC, Claro/Escuro/Sistema persistente. Cache PWA futuro exclui chats, documentos, mídia privada e dados sensíveis.

## Busca e IA

A conversa começa com “Olá! O que você está procurando?”, aceita texto/voz revisável, respostas contextuais, correções e rascunhos. Faz uma pergunta necessária por vez, diferencia produto/serviço, requisito/preferência e prepara resumo de título, tipo, categoria, marca/modelo, atributos, condição, orçamento opcional, região/alcance, atendimento, prazo, troca, faltantes e ambiguidades. Publicação exige confirmação explícita e compartilha só resumo, nunca conversa privada. Alterações publicadas exigem confirmação e preservam propostas. Resultados separam anúncios e propostas e nunca inventam fatos/aceitam proposta/concluem compra. Falha de IA oferece formulário manual.

Provedor real é configurável e chamado apenas no backend, com saída estruturada validada, custo/latência/falha sem conteúdo sensível. Filtros determinísticos de autorização, cobertura, suspensão e requisitos prevalecem; conteúdo externo é não confiável; biometria e chat de terceiros não são enviados.

## Pessoas, empresas e catálogo

Cliente: autenticação consolidada com Google e e-mail/senha, verificação/recuperação, sessões seguras, telefone antes de publicar/contatar, vinculação/recuperação/bloqueio e logout. Visitante pode preservar rascunho. Perfil inclui identidade, localização, aparência, notificações, histórico, privacidade, suporte e exclusão.

Identidade especializada (documento/facial/vida/duplicidade) possui não iniciada, processando, aprovada, nova tentativa, revisão manual, recusada e revogada. Só webhook validado no servidor aprova; guardar referência/status/unicidade mínimos; sem fornecedor fica pendente, com alternativa acessível/revisão. Não prova venda ou ausência de fraude.

Empresa informa CNPJ, razão/nome, nicho, descrição, endereço/contato, cobertura/modalidades, horários/fuso, representante e mídia. Verificações separadas de cadastro, poderes e operação aceitam documentos pertinentes em storage privado e empresa online sem fachada. Estados: rascunho, enviado, análise, correção, aprovado, recusado, suspenso; “Nova” por sete dias da primeira aprovação. Troca de representante revalida e revoga acessos.

Perfil público mostra identificação legal obrigatória, cobertura/horários, catálogo, modalidade, avaliação com volume, negócios confirmados e escopo de verificação — nunca CPF/documento/biometria nem cinco estrelas sem histórico. Catálogo administrativo define categorias/schemas. Produtos e serviços têm campos próprios, fotos reais, preço/estimativa, condição/escopo, disponibilidade/cobertura, prazo, garantia/restrições; plano limita anúncios ativos, não unidades.

## Oportunidade, proposta e chat

Cada procura admite propostas espontâneas de no máximo sete empresas distintas, uma vaga vitalícia por empresa mesmo após expiração/recusa; revisão não ocupa outra. Convite sem proposta pode expirar para outra. Reserva/consumo é transacional e bloqueia a oitava sob concorrência. Contato iniciado pelo cliente é adicional, autenticado e não falsificável. Seleção configurável: compatibilidade 40%, reputação/volume 25%, atualização 15%, resposta no horário 10%, rodízio 10%; até cinco por ranking e duas por rodízio, neutralidade para novas, sem compra de confiança/vaga.

Apresentação curta precede chat. Propostas versionadas incluem item/escopo/fotos, preço à vista, parcelas e total, frete/custos, prazo/modalidade, garantia, troca, restrições e validade; estimativa difere da condição final, expirada precisa atualização e aceite de conversa não confirma compra.

Chat completo requer interesse mútuo e identidade aprovada. Permite texto, foto, áudio e telefone; backend bloqueia links inclusive sem protocolo/legendas, PDF, documento, vídeo e outros arquivos. Retentativa idempotente, autoria/data/status reais, proposta fixada e histórico sem edição/remoção silenciosa. Denúncia/bloqueio preservam evidência. Suporte acessa somente caso autorizado e auditado. Não há botão WhatsApp nem promessa de prevenção total de fraude.

Troca registra bem, condição, defeitos e fotos somente aos envolvidos; empresa estima sujeita à inspeção e Pulso não garante preço.

## Resultado, reputação e cobrança

Negócio nasce de negociação existente por uma parte, nunca usuário arbitrário, e registra participantes, item/condição, centavos, data, atendimento e garantia. Estados: proposto, aguardando parte, aguardando execução, concluído/recebido, confirmado por ambas, divergência, não realizado, cancelado e devolvido. Silêncio nunca confirma; pendência não afeta nota; divergência pode anteceder confirmação; rótulo é “Negócios confirmados pelas partes”, sem auditoria de pagamento. Eventos/cancelamentos/devoluções preservam histórico.

QR permanente abre perfil e não confirma. QR de negócio é opaco, vinculado a negócio/comprador, expira, uso único, renovação/alteração revoga anterior; autenticação, revisão e confirmação são explícitas, e consumo+confirmação são uma transação. Há confirmação interna equivalente.

Após conclusão, comprador pode criar uma avaliação 1–5 por negócio, comentário e critérios; não é obrigatória nem recompensada. Empresa responde sem alterar nota. Ranking considera volume/recorrência limitada; suspeitas geram análise proporcional, não culpa automática; crítica legítima permanece; métricas exigem amostra/fórmula.

Consumidor é gratuito. Preços configuráveis iniciais: Essencial R$79,90/mês/50 ativos e recursos básicos; Profissional R$149,90/mês/300 ativos e relatórios detalhados/tendências/anúncio. Só funções existentes podem ser vendidas; plano não compra reputação/vaga. Assinatura real ativa exclusivamente por webhook autenticado/idempotente; cancelamento vale até fim pago, depois bloqueia novas oportunidades sem apagar histórico/suporte/confirmações. Não há checkout de compras.

## Gestão, suporte, notificações

Relatórios usam eventos reais (oportunidades, propostas, conversas, aceites, negócios, avaliações, resposta, anúncio/categoria, região agregada, recusas voluntárias), denominadores explícitos, sem chamar valores declarados de receita fiscal, sem expor busca privada ou pequenos grupos; vazio mostra vazio.

Admin mobile tem papéis separados admin/revisor/suporte e primeiro admin seguro sem senha fixa/autoelevação. Gerencia empresas, representantes/revisões, usuários/identidade, taxonomia/cobertura, planos/assinaturas, oportunidades, suporte/contestação, fraude/avaliações, indicadores/integrações/custos/auditoria/configuração. Ações têm ator, data, motivo; acesso a documentos/chats é mínimo.

Suporte por e-mail configurável cria caso referenciado: recebido, triagem, aguardando, análise, decidido, recurso, encerrado. Decisão/moderação preserva histórico e ouve envolvidos; conversa evidencia combinado, não prova pagamento/execução. Central interna deduplica e limita lembretes de todos os eventos; push/e-mail somente configurados e abertura revalida autorização.

## Dados, segurança, operação e aceite

Modelo relacional cobre usuários/perfis/identidade, empresas/membros/documentos/revisões/cobertura, geografia, taxonomia, anúncios/mídia, IA/estado/procura/troca, convite/vaga/proposta, chat, negócio/evento/confirmação/QR/avaliação, suporte, plano/assinatura, notificação/auditoria/custos. Migrations, índices, transações/idempotência e busca nacional paginada são obrigatórios; localStorage não é banco comercial; RLS, se adotado, é testada e chave admin nunca vai ao frontend.

Autorização por registro, sessão, mídia privada/URL temporária, uploads validados/sem metadados, abuso, segredos server-only, webhooks, auditoria, backup/restauração, exportação/exclusão, retenção e disputa são obrigatórios. Logs não contêm CPF/biometria/senha/token/chat. Não prometer E2E quando suporte lê. Termos, privacidade, retenção, idade e contratos exigem revisão jurídica; não alegar conformidade automática.

Google, e-mail, telefone, identidade, CNPJ, IA/transcrição, cobrança, storage e notificações separam dev/teste/homologação/produção. Falta de provedor exige contrato, documentação, pendência visível e falha segura; mocks apenas em teste. Aceite inclui isolamento/login/admin, IA/correção/confirmação/fallback/geografia, limite concorrente, propostas, identidade/chat/mídia, QR/idempotência, negócios/avaliações, webhook/expiração, suporte/auditoria, temas/responsividade/permissões, além de lint/tipos/testes/build e inspeção real quando disponível.
