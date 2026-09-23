CREATE TABLE users (
  id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer','business','reviewer','support','admin')),
  email_verified_at TEXT, blocked_at TEXT, created_at TEXT NOT NULL
);
CREATE TABLE profiles (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  phone_e164 TEXT UNIQUE, phone_verified_at TEXT, city_ibge_id INTEGER, state_code TEXT,
  theme TEXT NOT NULL DEFAULT 'system' CHECK(theme IN ('light','dark','system')),
  notification_preferences TEXT NOT NULL DEFAULT '{}', updated_at TEXT
);
CREATE TABLE sessions (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE, expires_at TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE INDEX sessions_user_expiry_idx ON sessions(user_id, expires_at);
CREATE TABLE audit_events (
  id TEXT PRIMARY KEY, actor_user_id TEXT REFERENCES users(id), action TEXT NOT NULL,
  target_type TEXT NOT NULL, target_id TEXT, justification TEXT, created_at TEXT NOT NULL
);
CREATE INDEX audit_actor_created_idx ON audit_events(actor_user_id, created_at);

-- Estados estruturados da busca ficam separados das mensagens privadas da conversa.
CREATE TABLE search_conversations (
  id TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  guest_draft_id TEXT, status TEXT NOT NULL DEFAULT 'draft', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE search_messages (
  id TEXT PRIMARY KEY, conversation_id TEXT NOT NULL REFERENCES search_conversations(id) ON DELETE CASCADE,
  author TEXT NOT NULL CHECK(author IN ('customer','assistant','system')), content TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE search_states (
  conversation_id TEXT PRIMARY KEY REFERENCES search_conversations(id) ON DELETE CASCADE,
  structured_json TEXT NOT NULL, confirmed_json TEXT NOT NULL DEFAULT '{}', publication_confirmed_at TEXT
);
