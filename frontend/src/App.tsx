import './App.css'

const appTitle: string = 'Личная библиотека книг'

export default function App() {
  return (
    <main className="app">
      <h1>{appTitle}</h1>
      <p>Личная полка книг с отметками о чтении.</p>
      <section>
        <h2>Мои книги</h2>
        <p>Здесь появится список ваших книг.</p>
      </section>
    </main>
  )
}