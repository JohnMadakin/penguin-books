import ListAuthors from '../pages/ListAuthors';
import Book from '../pages/Book';
const routes = [
  // {
  //   path: '/login',
  //   component: Login,
  //   name: 'login',
  //   exact: true,
  // },
  {
    path: '/authors/:bookId',
    component: Book,
    name: 'book',
    exact: true,
  },
  {
    path: '/authors',
    component: ListAuthors,
    name: 'listBooks',
    exact: true,
  },

];

export default routes;
