import { Link } from 'react-router'

export function NewBookPage() {
  return (
    <section>
      <h1>Создание книги</h1>

      <p>
        Форма добавления книги будет реализована в следующей лабораторной работе.
      </p>

      <Link to="/books">К списку книг</Link>
    </section>
  )
}