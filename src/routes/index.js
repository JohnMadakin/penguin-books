import ListAuthors from '../pages/ListAuthors';
import Dashboard from '../pages/Dashboard';
const routes = [
  // {
  //   path: '/authors/:bookId',
  //   component: Book,
  //   name: 'book',
  //   exact: true,
  // },
  {
    path: '/authors',
    component: ListAuthors,
    name: 'listBooks',
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    exact: true,
    protected: true,
  },

];

export default routes;
