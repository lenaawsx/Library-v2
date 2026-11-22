
export type BookStatus = 'planned' | 'reading' | 'read'

export type Book = {
  id: string
  title: string
  author: string
  genre: string
  genreName: string //7
  status: BookStatus
  rating: number | null
  note: string
}

// 3
//7
export type BookDraft = Omit<Book, 'id' | 'genreName'>
