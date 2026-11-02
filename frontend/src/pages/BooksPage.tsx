
import { useState } from 'react'
import { Link } from 'react-router'
import type { Book, BookStatus } from '../types/book'
import { BookCard } from '../components/BookCard.tsx'

type BooksPageProps = {
  books: Book[]
}

type BookFilter = BookStatus | 'all'

export function BooksPage({ books }: BooksPageProps) {
  const [status, setStatus] = useState<BookFilter>('all')

  const visibleBooks = books.filter(
    (book) => status === 'all' || book.status === status
  )

  function handleStatusChange(value: string) {
    if (
      value === 'all' ||
      value === 'planned' ||
      value === 'reading' ||
      value === 'read'
    ) {
      setStatus(value)
    }
  }

  return (
    <section>
      <h1>Мои книги</h1>
      <p>Личная полка книг с отметками о чтении.</p>
      <p>Изменения хранятся только до обновления страницы.</p>

      <p>
        <Link to="/books/new">Добавить книгу</Link>
      </p>

      <div className="form-group">
        <label htmlFor="book-filter">Фильтр по статусу</label>
        <select
          id="book-filter"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">Все книги</option>
          <option value="planned">В планах</option>
          <option value="reading">Читаю</option>
          <option value="read">Прочитана</option>
        </select>

        <button type="button" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>

      {books.length === 0 ? (
        <p>Книг пока нет. Добавь первую книгу!</p>
      ) : visibleBooks.length === 0 ? (
        <p>Книг с таким статусом нет. Попробуй другой фильтр.</p>
      ) : (
        <div className="book-list">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
