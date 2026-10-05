import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout.tsx'
import { BooksPage } from './pages/BooksPage.tsx'
import { BookDetailsPage } from './pages/BookDetailsPage.tsx'
import { NewBookPage } from './pages/NewBookPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/books" replace />} />

        <Route path="books" element={<BooksPage />} />

        <Route path="books/new" element={<NewBookPage />} />

        <Route path="books/:id" element={<BookDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}