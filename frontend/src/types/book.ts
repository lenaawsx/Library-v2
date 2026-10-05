export type BookStatus = 'planned' | 'reading' | 'read'

export type Book = {
  id: string
  title: string
  author: string
  genre: string
  status: BookStatus
  rating: number | null
  note: string
}