
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import type { Book, BookDraft } from './types/book'

import { AppLayout } from './app/AppLayout'
import { BooksPage } from './pages/BooksPage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { NewBookPage } from './pages/NewBookPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { EditBookPage } from './pages/EditBookPage'
import { AuthPage } from './pages/auth/AuthPage'
import { RequireAuth } from './components/RequireAuth'
import { useAuth } from './hooks/useAuth'
import { useBooks } from './hooks/useBooks'

import {
  createBook as saveBook,
  updateBook as saveBookUpdate,
  deleteBook as removeBook,
} from './services/books'

import './App.css'

export default function App() {
  const auth = useAuth()

  const userId =
    auth.status === 'authenticated'
      ? auth.session.user.id
      : ''

  const { load, reload } = useBooks(userId)

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    if (load.status === 'success') {
      setBooks(load.data)
    } else {
      setBooks([])
    }
  }, [load])

  async function createBook(draft: BookDraft): Promise<string> {
    const id = await saveBook(draft)

    setBooks((current) => [...current, { ...draft, id }])

    return id
  }

  async function updateBook(
    id: string,
    draft: BookDraft
  ): Promise<void> {
    await saveBookUpdate(id, draft)

    setBooks((current) =>
      current.map((book) =>
        book.id === id ? { ...draft, id: book.id } : book
      )
    )
  }

  async function deleteBook(id: string): Promise<void> {
    await removeBook(id)

    setBooks((current) =>
      current.filter((book) => book.id !== id)
    )
  }

  const booksUnavailable =
    load.status === 'loading' ? (
      <p>Загружаем книги...</p>
    ) : load.status === 'error' ? (
      <section>
        <p role="alert">{load.message}</p>
        <button type="button" onClick={() => void reload()}>
          Повторить загрузку
        </button>
      </section>
    ) : null

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<RequireAuth auth={auth} />}>
        <Route
          element={
            <AppLayout
              email={
                auth.status === 'authenticated'
                  ? auth.session.user.email ?? ''
                  : ''
              }
            />
          }
        >
          <Route index element={<Navigate to="/books" replace />} />

          <Route
            path="books"
            element={
              booksUnavailable ?? <BooksPage books={books} />
            }
          />

          <Route
            path="books/new"
            element={<NewBookPage onCreate={createBook} />}
          />

          <Route
            path="books/:id/edit"
            element={
              booksUnavailable ?? (
                <EditBookPage
                  books={books}
                  onUpdate={updateBook}
                />
              )
            }
          />

          <Route
            path="books/:id"
            element={
              booksUnavailable ?? (
                <BookDetailsPage
                  books={books}
                  onDelete={deleteBook}
                />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
