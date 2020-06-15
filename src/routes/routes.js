import ListAuthors from '../pages/ListAuthors';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Book from '../pages/Book';

const routes = [

  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    exact: true,
    protected: true,
  }
];

export default routes;
