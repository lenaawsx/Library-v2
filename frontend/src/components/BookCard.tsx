import { Link } from 'react-router'
import type { Book } from '../types/book.ts'

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      <h2>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h2>

      <p>Автор: {book.author}</p>
      <p>Жанр: {book.genre}</p>
      <p>Статус: {book.status}</p>
      <p>
        Оценка: {book.rating === null ? 'не поставлена' : `${book.rating}/5`}
      </p>
    </article>
  )
}