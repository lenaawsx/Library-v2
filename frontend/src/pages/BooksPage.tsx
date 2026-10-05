import { Link } from 'react-router'
import { BookCard } from '../components/BookCard.tsx'
import { books } from '../data/books.ts'

export function BooksPage() {
  return (
    <section>
      <h1>Мои книги</h1>

      <p>Личная полка книг с отметками о чтении.</p>

      <Link to="/books/new">Добавить книгу</Link>

      {books.length === 0 ? (
        <p>Книг пока нет.</p>
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
