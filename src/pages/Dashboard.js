import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

import routes from '../routes/childrenRoutes';
import SideNave from '../components/SideNav';
import Users from './Users';
import '../assets/styles/dashboard.css';

export default function Dashboard(props) {
  const navs = {
    home: 'rounded shadow transition-all text-gray-800',
    users: null,
    items: null,
    authors: null,
    settings: null,
  }
  const [activeNavLinks, setActiveNavLinks] = useState(navs);
  const navbarLinks = 'sidenav-links flex flex-row justify-between  text-gray-600 font-semibold py-2 px-4 mt-5 w-32';

  let currentNav = 'home';
  function handleNavClick(event) {
    if (event.target.name != currentNav) {
      const navClone = { ...navs };
      navClone[event.target.name] = 'rounded shadow transition duration-100 ease-in-out text-gray-800';
      navClone[currentNav] = null;
      currentNav = event.target.name;
      setActiveNavLinks(navClone);
    }
  }

  return (
    <div className="dashboard-container relative overflow-hidden">
      <div className="max-w-screen-xl mx-auto ">
        <div className="relative flex flex-row mx-auto z-10 pb-8 sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">
          <div className="relative sm:h-10 lg:h-64 lg:w-48 my-16 mx-16">
            <SideNave activeNavLinks={activeNavLinks} navbarLinks={navbarLinks} pathUrl={props.match.url} handleNavClick={(e) => handleNavClick(e)}/>
          </div>

          <div className="dashboard-content">
            <div>
              {
                routes.map(singleRoute => {
                  return (
                    <Route key={singleRoute.name} path={`${props.match.path}${singleRoute.path}`} component={singleRoute.component} />
                  );
                })
              }
              {/* <Route path={`${props.match.path}/users`} component={Users} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
