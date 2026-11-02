import type { Book } from '../types/book.ts'

export const books: Book[] = [
  {
    id: 'b1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    genre: 'romance',
    status: 'read',
    rating: 5,
    note: 'Очень интересная книга с необычным сюжетом.',
  },
  {
    id: 'b2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    genre: 'detective',
    status: 'reading',
    rating: null,
    note: 'Читаю постепенно, хочу лучше разобраться в героях.',
  },
  {
    id: 'b3',
    title: 'Гарри Поттер и философский камень',
    author: 'Джоан Роулинг',
    genre: 'fantasy',
    status: 'read',
    rating: 5,
    note: 'Любимая книга из серии о Гарри Поттере.',
  },
  {
    id: 'b4',
    title: '1984',
    author: 'Джордж Оруэлл',
    genre: 'science-fiction',
    status: 'planned',
    rating: null,
    note: 'Хочу прочитать в ближайшее время.',
  },
  {
    id: 'b5',
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    genre: 'adventure',
    status: 'read',
    rating: 4,
    note: 'Небольшая, но очень глубокая история.',
  },
]