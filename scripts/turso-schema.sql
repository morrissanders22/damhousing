-- Turso / libsql (SQLite) schema voor de MijnMustangTrouwauto.nl CMS-backend.
-- Eén key-value tabel; `value` is JSON-tekst (de backend (de)serialiseert).
-- Eenmalig laden via de Turso CLI:  turso db shell <db> < scripts/turso-schema.sql
-- of via de libsql HTTP pipeline-API (zie reapply/handover).
CREATE TABLE IF NOT EXISTS kv (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TEXT
);
