import ListAuthors from '../pages/ListAuthors';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Book from '../pages/Book';

const routes = [
  // {
  //   path: '/authors/:bookId',
  //   component: Book,
  //   name: 'book',
  //   exact: true,
  // },
  // {
  //   path: '/dashboard/authors',
  //   component: ListAuthors,
  //   name: 'listBooks',
  //   exact: true,
  // },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    exact: true,
    protected: true,
  },
  // {
  //   path: '/dashboard/users',
  //   component: Dashboard,
  //   name: 'users',
  //   exact: true,
  //   protected: true,
  // },
  // {
  //   path: '/dashboard/settings',
  //   component: Settings,
  //   name: 'settings',
  //   exact: true,
  //   protected: true,
  // },

  // {
  //   path: '/dashboard/books',
  //   component: Book,
  //   name: 'books',
  //   exact: true,
  //   protected: true,
  // },
];

export default routes;
