import ListAuthors from '../pages/ListAuthors';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Book from '../pages/Book';

const routes = [
  {
    path: '/users',
    component: Users,
    name: 'users',
  },
  {
    path: '/settings',
    component: Settings,
    name: 'settings',
  },

  {
    path: '/books',
    component: Book,
    name: 'books',
  },
];

export default routes;
