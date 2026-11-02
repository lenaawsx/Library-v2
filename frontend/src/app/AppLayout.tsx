
import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <p className="app-title">Личная библиотека книг</p>

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

      <main>
        <Outlet />
      </main>
    </div>
  )
}
