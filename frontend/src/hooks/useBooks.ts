
import { useEffect, useState } from 'react'
import type { Book } from '../types/book'
import { getBooks } from '../services/books'

type BooksLoad =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Book[] }

export function useBooks(userId: string) {
  const [load, setLoad] = useState<BooksLoad>({
    status: 'loading',
  })

  useEffect(() => {
    let active = true

    if (!userId) {
      setLoad({ status: 'success', data: [] })

      return () => {
        active = false
      }
    }

    async function loadBooks() {
      setLoad({ status: 'loading' })

      try {
        const data = await getBooks()

        if (active) {
          setLoad({ status: 'success', data })
        }
      } catch (error: unknown) {
        if (active) {
          setLoad({
            status: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Не удалось загрузить книги.',
          })
        }
      }
    }

    void loadBooks()

    return () => {
      active = false
    }
  }, [userId])

  async function reload(): Promise<Book[] | null> {
    if (!userId) return []

    setLoad({ status: 'loading' })

    try {
      const data = await getBooks()
      setLoad({ status: 'success', data })
      return data
    } catch (error: unknown) {
      setLoad({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить книги.',
      })
      return null
    }
  }

  function addBook(book: Book) {
    setLoad((current) =>
      current.status === 'success'
        ? { status: 'success', data: [book, ...current.data] }
        : current
    )
  }

  return { load, reload, addBook }
}
