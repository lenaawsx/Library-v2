
import { Link, useNavigate, useParams } from 'react-router'
import type { Book } from '../types/book'

type BookDetailsPageProps = {
  books: Book[]
  onDelete: (id: string) => void
}

export function BookDetailsPage({ books, onDelete }: BookDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const book = books.find((item) => item.id === id)

  function handleDelete() {
    if (!book) return

    const confirmed = window.confirm(
      `Удалить книгу «${book.title}»?`
    )

    if (confirmed) {
      onDelete(book.id)
      navigate('/books')
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

      <Link to={`/books/${book.id}/edit`}>Редактировать</Link>
      {' '}
      <button type="button" onClick={handleDelete}>
        Удалить книгу
      </button>
      {' '}
      <Link to="/books">К списку книг</Link>
    </section>
  )
}
