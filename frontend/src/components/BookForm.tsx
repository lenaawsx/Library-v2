
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { BookDraft } from '../types/book'
import { useGenres } from '../hooks/useGenres' //4

type BookFormProps = {
  initialValues: BookDraft
  onSave: (draft: BookDraft) => void
  onCancel: () => void
}

export function BookForm({ initialValues, onSave, onCancel }: BookFormProps) {
  const [draft, setDraft] = useState<BookDraft>(() => ({ ...initialValues }))
  const [error, setError] = useState('')
  const { load, retry } = useGenres() //4

  const genres = load.status === 'success' ? load.data : [] //4
  const selectedGenreExists = genres.some( //4
    (genre) => genre.id === draft.genre, //4
  )
  const canSave = load.status === 'success' && selectedGenreExists //4

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!canSave) { //4
      setError('Дождитесь загрузки жанров и выберите доступный жанр.') //4
      return //4
    }

    const title = draft.title.trim()
    const author = draft.author.trim()
    const genre = draft.genre

    if (!title || !author || !genre) {
      setError('Заполните название, автора и жанр книги.')
      return
    }

    if (
      draft.rating !== null &&
      (!Number.isFinite(draft.rating) ||
        draft.rating < 1 ||
        draft.rating > 5)
    ) {
      setError('Оценка должна быть от 1 до 5 или не указана.')
      return
    }

    setError('')
    onSave({ ...draft, title, author, genre, note: draft.note.trim() })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="book-title">Название книги *</label>
        <input
          id="book-title"
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="book-author">Автор *</label>
        <input
          id="book-author"
          type="text"
          value={draft.author}
          onChange={(e) => setDraft({ ...draft, author: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="book-genre">Жанр *</label>
        <select
          id="book-genre"
          value={draft.genre}
          disabled={load.status !== 'success' || genres.length === 0}
          onChange={(e) => {
            setDraft({ ...draft, genre: e.target.value })
            setError('')
          }}
          required
        >
          <option value="">Выберите жанр</option>

          {draft.genre !== '' && !selectedGenreExists && (
            <option value={draft.genre} disabled>
              Текущий жанр: {draft.genre} — выберите доступный жанр
            </option>
          )}

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {load.status === 'loading' && (
        <p role="status">Загружаем жанры…</p>
      )}

      {load.status === 'success' && genres.length > 0 && (
        <button type="button" onClick={retry}>
          Обновить справочник
        </button>
      )}

      {load.status === 'error' && (
        <div>
          <p role="alert">{load.message}</p>
          <button type="button" onClick={retry}>
            Повторить загрузку
          </button>
        </div>
      )}

      {load.status === 'success' && genres.length === 0 && (
        <div>
          <p role="status">Жанров пока нет. Сохранение недоступно.</p>
          <button type="button" onClick={retry}>
            Повторить загрузку
          </button>
        </div>
      )}

      {load.status === 'success' &&
        genres.length > 0 &&
        !selectedGenreExists &&
        draft.genre !== '' && (
          <p role="status">
            Сохранённый жанр отсутствует в справочнике. Выберите другой.
          </p>
        )}

      <div className="form-group">
        <label htmlFor="book-status">Статус чтения</label>
        <select
          id="book-status"
          value={draft.status}
          onChange={(e) => {
            const status = e.target.value

            if (
              status === 'planned' ||
              status === 'reading' ||
              status === 'read'
            ) {
              setDraft({ ...draft, status })
            }
          }}
        >
          <option value="planned">В планах</option>
          <option value="reading">Читаю</option>
          <option value="read">Прочитана</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="book-rating">Оценка (от 1 до 5)</label>
        <select
          id="book-rating"
          value={draft.rating ?? ''}
          onChange={(e) => {
            const value = e.target.value

            setDraft({
              ...draft,
              rating: value === '' ? null : Number(value),
            })
          }}
        >
          <option value="">Без оценки</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="book-note">Заметка</label>
        <textarea
          id="book-note"
          value={draft.note}
          onChange={(e) => setDraft({ ...draft, note: e.target.value })}
          rows={4}
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={!canSave}>
        Сохранить
      </button>
      <button type="button" onClick={onCancel}>
        Отмена
      </button>
    </form>
  )
}
