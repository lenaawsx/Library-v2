
import { Link, useNavigate, useParams } from 'react-router'
import type { Book, BookDraft } from '../types/book'
import { BookForm } from '../components/BookForm'

type EditBookPageProps = {
  books: Book[]
  onUpdate: (id: string, draft: BookDraft) => void
}

export function EditBookPage({ books, onUpdate }: EditBookPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const foundBook = books.find((item) => item.id === id)

  if (!foundBook) {
    return (
      <section>
        <h1>Книга не найдена</h1>
        <p>Нельзя отредактировать книгу, которой нет в библиотеке.</p>
        <Link to="/books">К списку книг</Link>
      </section>
    )
  }

  const book: Book = foundBook

  const initialValues: BookDraft = {
    title: book.title,
    author: book.author,
    genre: book.genre,
    status: book.status,
    rating: book.rating,
    note: book.note,
  }

  function handleSave(draft: BookDraft) {
    onUpdate(book.id, draft)
    navigate(`/books/${book.id}`)
  }

  return (
    <section>
      <h1>Редактирование книги</h1>

      <BookForm
        initialValues={initialValues}
        onSave={handleSave}
        onCancel={() => navigate(`/books/${book.id}`)}
      />
    </section>
  )
}
