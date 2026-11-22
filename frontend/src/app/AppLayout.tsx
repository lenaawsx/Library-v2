
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import { supabase } from '../lib/supabase'

type AppLayoutProps = {
  email: string
}

export function AppLayout({ email }: AppLayoutProps) {
  const [error, setError] = useState('')

  async function handleLogout() {
    setError('')

    const { error } = await supabase.auth.signOut({
      scope: 'local',
    })

    if (error) {
      setError('Не удалось выйти из аккаунта.')
    }
  }

  return (
    <div className="app">
      <header>
        <p className="app-title">Личная библиотека книг</p>

        <p>Пользователь: {email}</p>

        <button type="button" onClick={handleLogout}>
          Выйти
        </button>

        <nav aria-label="Основная навигация">
          <NavLink to="/books" end>
            Книги
          </NavLink>

          <NavLink to="/books/new">
            Добавить книгу
          </NavLink>
        </nav>
      </header>

      <p className="storage-notice">
        Изменения хранятся только до обновления страницы.
      </p>

      {error && <p role="alert">{error}</p>}

      <main>
        <Outlet />
      </main>
    </div>
  )
}
