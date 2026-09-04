-- Supabase schema voor de DAM Housing CMS-backend.
-- Drop-in key-value store: alle 121 call-sites in api/index.py lopen via
-- kv_get/kv_set/kv_delete/kv_list, die deze ene tabel via PostgREST benaderen.
--
-- Draai eenmalig na het provisionen van Supabase:
--   psql "$POSTGRES_URL_NON_POOLING" -f scripts/supabase-schema.sql
-- of plak in Supabase Dashboard -> SQL Editor.

create table if not exists public.kv (
  key        text primary key,
  value      jsonb,
  updated_at timestamptz not null default now()
);

-- Houd updated_at vers bij elke upsert-UPDATE (on_conflict=key).
create or replace function public.kv_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists kv_touch on public.kv;
create trigger kv_touch
  before update on public.kv
  for each row execute function public.kv_touch_updated_at();

-- RLS aan, geen policies: anon/public key heeft geen toegang.
-- De backend gebruikt de SERVICE_ROLE key, die RLS bypasst.
alter table public.kv enable row level security;
