insert into public.genres (id, name)
values
  ('fantasy', 'Фэнтези'),
  ('detective', 'Детектив'),
  ('romance', 'Романтика'),
  ('science-fiction', 'Фантастика'),
  ('adventure', 'Приключения')
on conflict (id)
do update set name = excluded.name;