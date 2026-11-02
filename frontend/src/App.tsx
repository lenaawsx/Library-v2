
import { useState } from 'react' //3
import { Navigate, Route, Routes } from 'react-router'
import type { Book, BookDraft } from './types/book' //3
import { books as initialBooks } from './data/books' //3

import { AppLayout } from './app/AppLayout.tsx'
import { BooksPage } from './pages/BooksPage.tsx'
import { BookDetailsPage } from './pages/BookDetailsPage.tsx'
import { NewBookPage } from './pages/NewBookPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { EditBookPage } from './pages/EditBookPage' //3
import './App.css'

export default function App() {
  //3 Общий список книг хранится в App
  const [books, setBooks] = useState<Book[]>(() =>
    initialBooks.map((book) => ({ ...book }))
  )

  //3 Создание книги
  function createBook(draft: BookDraft): string {
    const id = crypto.randomUUID()

    setBooks((current) => [...current, { ...draft, id }])

    return id
  }

  //3 Редактирование книги
  function updateBook(id: string, draft: BookDraft): void {
    setBooks((current) =>
      current.map((book) =>
        book.id === id ? { ...draft, id: book.id } : book
      )
    )
  }

  //3 Удаление книги
  function deleteBook(id: string): void {
    setBooks((current) => current.filter((book) => book.id !== id))
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/books" replace />} />

        {/*3 Список книг получает общий список */}
        <Route
          path="books"
          element={<BooksPage books={books} />}
        />

        {/*3 Создание получает функцию добавления */}
        <Route
          path="books/new"
          element={<NewBookPage onCreate={createBook} />}
        />

        {/*3 Редактирование книги */}
        <Route
          path="books/:id/edit"
          element={<EditBookPage books={books} onUpdate={updateBook} />}
        />

        {/*3 Карточка получает список и функцию удаления */}
        <Route
          path="books/:id"
          element={<BookDetailsPage books={books} onDelete={deleteBook} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
