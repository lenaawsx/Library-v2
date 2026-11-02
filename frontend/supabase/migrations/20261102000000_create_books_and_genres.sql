-- Таблица жанров
create table public.genres (
  id text primary key,
  name text not null unique,
  constraint genres_name_not_empty
    check (length(trim(name)) > 0)
);

-- Таблица книг
create table public.books (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  genre_id text not null references public.genres(id),
  title text not null,
  author text not null,
  status text not null default 'planned',
  rating integer,
  note text not null default '',
  created_at timestamptz not null default now(),

  constraint books_title_not_empty
    check (length(trim(title)) > 0),

  constraint books_author_not_empty
    check (length(trim(author)) > 0),

  constraint books_status_check
    check (status in ('planned', 'reading', 'read')),

  constraint books_rating_check
    check (rating is null or rating between 1 and 5)
);

-- Включаем защиту строк
alter table public.genres enable row level security;
alter table public.books enable row level security;

-- Запрещаем доступ клиентским ролям по умолчанию
revoke all on table public.genres from anon, authenticated;
revoke all on table public.books from anon, authenticated;

-- Разрешаем только чтение справочника жанров
grant usage on schema public to anon, authenticated;
grant select on table public.genres to anon, authenticated;

create policy "Anyone can read genres"
on public.genres
for select
to anon, authenticated
using (true);