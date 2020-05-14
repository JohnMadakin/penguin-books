import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Book from '../pages/Book';
import Items from '../pages/Items';

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
  {
    path: '/items',
    component: Items,
    name: 'items',
  },

];

export default routes;
