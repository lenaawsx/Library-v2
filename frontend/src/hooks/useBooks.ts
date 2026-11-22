
import { useEffect, useState } from 'react'
import type { Book } from '../types/book'
import {
  getBooks,
  type BookFilters,
  emptyBookFilters,
} from '../services/books'

type BooksLoad =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: Book[] }

export function useBooks(userId: string) {
  const [load, setLoad] = useState<BooksLoad>({
    status: 'loading',
  })

  //7
  async function reload(
    filters: BookFilters = emptyBookFilters,
  ): Promise<Book[] | null> {
    if (!userId) {
      setLoad({ status: 'success', data: [] })
      return []
    }

    setLoad({ status: 'loading' })

    try {
      const data = await getBooks(filters)
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

  useEffect(() => {
    let active = true

    async function loadBooks() {
      if (!userId) {
        setLoad({ status: 'success', data: [] })
        return
      }

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

  //7
  function addBook(book: Book) {
    setLoad((current) =>
      current.status === 'success'
        ? { status: 'success', data: [book, ...current.data] }
        : current
    )
  }

  return { load, reload, addBook }
}
