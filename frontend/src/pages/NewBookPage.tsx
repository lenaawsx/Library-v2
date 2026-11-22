
import { useNavigate } from 'react-router' //3
import type { BookDraft } from '../types/book' //3
import { BookForm } from '../components/BookForm'

type NewBookPageProps = { //3
  onCreate: (draft: BookDraft) => Promise<string> //3
} //3

const emptyBook: BookDraft = { //3
  title: '', //3
  author: '', //3
  genre: '', //3
  status: 'planned', //3
  rating: null, //3
  note: '', //3
} //3

export function NewBookPage({ onCreate }: NewBookPageProps) { //3
  const navigate = useNavigate() //3

  async function handleSave(draft: BookDraft) { //3
    const id = await onCreate(draft) //3
    navigate(`/books/${id}`) //3
  } //3

  return (
    <section>
      <h1>Добавление книги</h1> {/*3*/}

      <BookForm
        initialValues={emptyBook} //3
        onSave={handleSave} //3
        onCancel={() => navigate('/books')} //3
      />
    </section>
  )
}
