import React, { useState, useContext } from 'react';
import {  Route, useLocation } from 'react-router-dom';

import routes from '../routes/childrenRoutes';
import SideNave from '../components/SideNav';
import Users from './Users';
import Spinner from '../components/SpinnerBox';
import { store } from '../store';



import '../assets/styles/dashboard.css';

export default function Dashboard(props) {
  const location = useLocation();
  const [slash, basepath, defaultNav] = location.pathname.split('/');
  const navs = {
    home: null,
    users: null,
    items: null,
    authors: null,
    settings: null,
  }

  const currentLocation = !defaultNav ? 'home' : defaultNav;
  navs[currentLocation] = 'rounded shadow transition-all text-gray-800';

  const [activeNavLinks, setActiveNavLinks] = useState(navs);
  const navbarLinks = 'sidenav-links flex flex-row justify-between  text-gray-600 font-semibold py-2 px-4 mt-5 w-32';

  let currentNav = currentLocation;
  function handleNavClick(event) {
    if (event.target.name != currentNav) {
      const navClone = { ...navs };
      navClone[event.target.name] = 'rounded shadow transition duration-100 ease-in-out text-gray-800';
      navClone[currentNav] = null;
      currentNav = event.target.name;
      setActiveNavLinks(navClone);
      if (event.target.name == 'users'){
        stores.dispatch({ type: 'load_users', payload: { loadUsers: true } })
      }
    }
  }
  const stores  = useContext(store);

  //  dispatch({ type: 'load_users', payload: { loadUsers: true } })


  return (
    <div className="dashboard-container relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto ">
        <div className="relative flex flex-row mx-auto z-10 pb-8 sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">
          <div className="relative sm:h-10 lg:h-64 lg:w-48 m-4">
            <SideNave activeNavLinks={activeNavLinks} navbarLinks={navbarLinks} pathUrl={props.match.url} handleNavClick={(e) => handleNavClick(e)}/>
          </div>

          <div className="dashboard-content w-screen">
           
            <div className="dashboard-routes-container relative sm:h-full lg:h-full lg:w-full xl:w-full xl:h-full m-4">
              {activeNavLinks.home && <h1 className="text-2xl text-center">Welcome to the Penguin Library Management System</h1>}
              {
                routes.map(singleRoute => {
                  return (
                    <Route key={singleRoute.name} exact={singleRoute.exact} path={`${props.match.path}${singleRoute.path}`} component={singleRoute.component} />
                  );
                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
