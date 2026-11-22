
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import type { Book } from '../types/book'

type BookDetailsPageProps = {
  books: Book[]
  onDelete: (id: string) => void | Promise<void>
}

export function BookDetailsPage({ books, onDelete }: BookDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const book = books.find((item) => item.id === id)

  async function handleDelete() {
    if (!book || deleting) return

    const confirmed = window.confirm(
      `Удалить книгу «${book.title}»?`
    )

    if (!confirmed) return

    setError('')
    setDeleting(true)

    try {
      await onDelete(book.id)
      navigate('/books')
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось удалить книгу.'
      )
    } finally {
      setDeleting(false)
    }
  }

  if (!book) {
    return (
      <section>
        <h1>Книга не найдена</h1>
        <p>Книги с таким идентификатором нет в библиотеке.</p>
        <Link to="/books">К списку книг</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{book.title}</h1>

      <p><strong>Автор:</strong> {book.author}</p>
      <p><strong>Жанр:</strong> {book.genre}</p>
      <p>
        <strong>Статус:</strong>{' '}
        {book.status === 'read'
          ? 'Прочитана'
          : book.status === 'reading'
            ? 'Читаю'
            : 'Планирую прочитать'}
      </p>
      <p>
        <strong>Оценка:</strong>{' '}
        {book.rating === null ? 'Не поставлена' : `${book.rating}/5`}
      </p>
      <p><strong>Заметка:</strong> {book.note}</p>

      {error && <p role="alert">{error}</p>}

      <Link to={`/books/${book.id}/edit`}>Редактировать</Link>
      {' '}
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Удаление...' : 'Удалить книгу'}
      </button>
      {' '}
      <Link to="/books">К списку книг</Link>
    </section>
  )
}
