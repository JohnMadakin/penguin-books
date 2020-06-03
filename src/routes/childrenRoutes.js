import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Book from '../pages/Book';
import Items from '../pages/Items';
import Authors from '../pages/Authors';
import ViewItems from '../pages/ViewAuthorsItem';
import ViewUsersItems from '../pages/ViewUsersBorrowedItems';


const routes = [
  {
    path: '/users',
    component: Users,
    name: 'users',
    exact: true
  },
  {
    path: '/settings',
    component: Settings,
    name: 'settings',
    exact: true

  },

  {
    path: '/books',
    component: Book,
    name: 'books',
    exact: true

  },
  {
    path: '/items',
    component: Items,
    name: 'items',
    exact: true
  },
  {
    path: '/authors',
    component: Authors,
    name: 'authors',
    exact: true
  },
  {
    path: '/authors/:authorId',
    component: ViewItems,
    name: `view-authors`,
  },
  {
    path: '/users/:userId/items',
    component: ViewUsersItems,
    name: 'users-borrowed-items',
    exact: true
  },



];

export default routes;
