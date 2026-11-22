
import type { Book, BookDraft } from '../types/book'
import { supabase } from '../lib/supabase'

type BookRow = {
  id: string
  title: string
  author: string
  genre_id: string
  status: Book['status']
  rating: number | null
  note: string
}

function mapBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    genre: row.genre_id,
    status: row.status,
    rating: row.rating,
    note: row.note,
  }
}

// Получение книг текущего пользователя
export async function getBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('id, title, author, genre_id, status, rating, note')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Не удалось загрузить книги: ${error.message}`)
  }

  return (data as BookRow[]).map(mapBook)
}

// Добавление книги
export async function createBook(draft: BookDraft): Promise<string> {
  const { data, error } = await supabase
    .from('books')
    .insert({
      title: draft.title,
      author: draft.author,
      genre_id: draft.genre,
      status: draft.status,
      rating: draft.rating,
      note: draft.note,
    })
    .select('id')
    .single()

  if (error) {
    throw new Error(`Не удалось добавить книгу: ${error.message}`)
  }

  return data.id
}

// Редактирование книги
export async function updateBook(
  id: string,
  draft: BookDraft,
): Promise<void> {
  const { error } = await supabase
    .from('books')
    .update({
      title: draft.title,
      author: draft.author,
      genre_id: draft.genre,
      status: draft.status,
      rating: draft.rating,
      note: draft.note,
    })
    .eq('id', id)

  if (error) {
    throw new Error(`Не удалось изменить книгу: ${error.message}`)
  }
}

// Удаление книги
export async function deleteBook(id: string): Promise<void> {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Не удалось удалить книгу: ${error.message}`)
  }
}
