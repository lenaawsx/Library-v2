
import { useState } from 'react'
import { Link } from 'react-router'
import type { FormEvent } from 'react'
import type { Book } from '../types/book'
import {
  type BookFilters,
  emptyBookFilters,
} from '../services/books'
import { useGenres } from '../hooks/useGenres'
import { BookCard } from '../components/BookCard.tsx'

type BooksPageProps = {
  books: Book[]
  onApplyFilters: (filters: BookFilters) => void //7
}

export function BooksPage({ books, onApplyFilters }: BooksPageProps) {
  //7
  const [filters, setFilters] = useState<BookFilters>(emptyBookFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<BookFilters>(emptyBookFilters)
  const { load } = useGenres()

  //7
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAppliedFilters(filters)
    onApplyFilters(filters)
  }

  //7
  function handleReset() {
    setFilters(emptyBookFilters)
    setAppliedFilters(emptyBookFilters)
    onApplyFilters(emptyBookFilters)
  }

  //7
  const hasFilters =
    appliedFilters.query.trim() !== '' || appliedFilters.genreId !== ''

  return (
    <section>
      <h1>Мои книги</h1>
      <p>Личная полка книг с отметками о чтении.</p>

      <p>
        <Link to="/books/new">Добавить книгу</Link>
      </p>

      {/*7*/}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="book-search">Поиск по названию или автору</label>
          <input
            id="book-search"
            type="text"
            value={filters.query}
            onChange={(e) =>
              setFilters({ ...filters, query: e.target.value })
            }
            placeholder="Введите название или автора"
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-genre-filter">Фильтр по жанру</label>
          <select
            id="book-genre-filter"
            value={filters.genreId}
            disabled={load.status !== 'success'}
            onChange={(e) =>
              setFilters({ ...filters, genreId: e.target.value })
            }
          >
            <option value="">Все жанры</option>

            {load.status === 'success' &&
              load.data.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit">Применить фильтры</button>
        <button type="button" onClick={handleReset}>
          Сбросить фильтры
        </button>
      </form>

      {/*7*/}
      {books.length === 0 ? (
        hasFilters ? (
          <p>По заданным параметрам книги не найдены.</p>
        ) : (
          <p>Книг пока нет. Добавь первую книгу!</p>
        )
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  )
}
