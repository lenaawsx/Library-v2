-- Автоматически назначаем владельца новой записи
ALTER TABLE public.books
ALTER COLUMN owner_id SET DEFAULT auth.uid();

-- Включаем защиту строк
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Запрещаем доступ анонимным пользователям
REVOKE ALL ON TABLE public.books FROM anon;

-- Разрешаем авторизованным пользователям нужные операции
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.books TO authenticated;

-- Удаляем политики, если они уже существуют
DROP POLICY IF EXISTS "Users can view own books" ON public.books;
DROP POLICY IF EXISTS "Users can insert own books" ON public.books;
DROP POLICY IF EXISTS "Users can update own books" ON public.books;
DROP POLICY IF EXISTS "Users can delete own books" ON public.books;

-- Просмотр только собственных книг
CREATE POLICY "Users can view own books"
ON public.books
FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

-- Добавление книг только от своего имени
CREATE POLICY "Users can insert own books"
ON public.books
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

-- Изменение только собственных книг
CREATE POLICY "Users can update own books"
ON public.books
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Удаление только собственных книг
CREATE POLICY "Users can delete own books"
ON public.books
FOR DELETE
TO authenticated
USING (owner_id = auth.uid());