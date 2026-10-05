import { Link, useParams } from 'react-router'
import { books } from '../data/books.ts'

export function BookDetailsPage() {
  const { id } = useParams()

  const book = books.find((item) => item.id === id)

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

      <Link to="/books">К списку книг</Link>
    </section>
  )
}