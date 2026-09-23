# Implantação

## Homologação (ainda não realizada)

1. Provisionar Node 24+, PostgreSQL gerenciado e armazenamento privado na região aprovada.
2. Configurar variáveis por cofre de segredos; `SESSION_SECRET` aleatório com 32+ caracteres, `APP_ORIGIN` HTTPS exato e credenciais exclusivas de homologação.
3. Adaptar/testar migrations contra PostgreSQL, executar backup pré-migração e migration em job único.
4. Executar lint, tipos, testes, build, smoke test e testes de autorização; só então promover artefato imutável.
5. Configurar health check `/api/health`, TLS, proxy confiável, rate limit distribuído e alertas sem conteúdo sensível.

## Primeiro administrador

O cadastro público nunca cria admin. Até existir CLI dedicada, somente em homologação um DBA autenticado poderá: cadastrar normalmente, confirmar identidade por procedimento operacional, executar em transação `UPDATE users SET role='admin' WHERE id=? AND role='customer'`, e inserir `audit_events` com ator operacional/justificativa. Produção exige CLI que faça ambos atomicamente e dupla aprovação. Nunca usar senha fixa.

## Backup e restauração

No desenvolvimento, pare o processo e copie `data/pulso.db` junto dos arquivos `-wal/-shm`, ou use o comando SQLite de backup; valide restauração em arquivo novo e rode `PRAGMA integrity_check`. Em produção, usar snapshots/PITR do PostgreSQL, versionamento do storage, criptografia gerenciada, retenção por finalidade e exercício periódico de restauração. Backups não substituem política de exclusão/retensão.

Não há hospedagem configurada, link público ou publicação em lojas. Revisões jurídica, privacidade, segurança, contratos e faixa etária são pré-requisitos de operação pública.
