
-- Удаляем старое ограничение
ALTER TABLE public.books
DROP CONSTRAINT IF EXISTS books_genre_id_fkey;

-- Создаём связь с правилом RESTRICT
ALTER TABLE public.books
ADD CONSTRAINT books_genre_id_fkey
FOREIGN KEY (genre_id)
REFERENCES public.genres(id)
ON UPDATE CASCADE
ON DELETE RESTRICT;

-- Индекс для частого поиска по владельцу и статусу
CREATE INDEX IF NOT EXISTS books_owner_status_idx
ON public.books(owner_id, status);

-- Индекс для связи с жанрами
CREATE INDEX IF NOT EXISTS books_genre_id_idx
ON public.books(genre_id);
