
import type { Book, BookDraft } from '../types/book'
import { supabase } from '../lib/supabase'

//7
export type BookFilters = {
  query: string
  genreId: string
}

//7
export const emptyBookFilters: BookFilters = {
  query: '',
  genreId: '',
}

type BookRow = {
  id: string
  title: string
  author: string
  genre_id: string
  status: Book['status']
  rating: number | null
  note: string
  genres: {
    id: string
    name: string
  } | null //7
}

//7
function mapBook(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    genre: row.genre_id,
    genreName: row.genres?.name ?? 'Неизвестный жанр',
    status: row.status,
    rating: row.rating,
    note: row.note,
  }
}

//7
export async function getBooks(
  filters: BookFilters = emptyBookFilters,
): Promise<Book[]> {
  let request = supabase
    .from('books')
    .select(`
      id,
      title,
      author,
      genre_id,
      status,
      rating,
      note,
      genres (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false })

  const query = filters.query.trim()

  //7
  if (query) {
    request = request.or(
      `title.ilike.%${query}%,author.ilike.%${query}%`,
    )
  }

  //7
  if (filters.genreId) {
    request = request.eq('genre_id', filters.genreId)
  }

  const { data, error } = await request

  if (error) {
    throw new Error(`Не удалось загрузить книги: ${error.message}`)
  }

  return (data as unknown as BookRow[]).map(mapBook)
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
