import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/sideNav.css';

export default function SideNav(props) {
  const { activeNavLinks, navbarLinks, handleNavClick, pathUrl } = props;

  return (
    <div>
      <ul>
        <li className={activeNavLinks.home ? `${navbarLinks} ${activeNavLinks.home}` : navbarLinks}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 16" >
            <path fill={activeNavLinks.home ? "#292727" : "#718096"} d="M16 9.226l-8-6.21-8 6.21v-2.532l8-6.21 8 6.21zM14 9v6h-4v-4h-4v4h-4v-6l6-4.5z"></path>
          </svg>
          <Link className="pl-3 text-xl" to="/" onClick={handleNavClick} name="home">
          Home
          </Link>
          </li>
        <li className={activeNavLinks.users ? `${navbarLinks} ${activeNavLinks.users}` : navbarLinks}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 16">
            <path fill={activeNavLinks.users ? "#292727" : "#718096"} d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
            <path fill={activeNavLinks.users ? "#292727" : "#718096"} d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path>
          </svg>
          <Link to={`${pathUrl}/users`}  className="pl-3 text-xl" onClick={handleNavClick} name="users">Users</Link></li>

        <li className={activeNavLinks.items ? `${navbarLinks} ${activeNavLinks.items}` : navbarLinks}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 16">
            <path fill={activeNavLinks.items ? "#292727" : "#718096"} d="M14 2v13h-10.5c-0.829 0-1.5-0.672-1.5-1.5s0.671-1.5 1.5-1.5h9.5v-12h-10c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12v-14h-1z"></path>
            <path fill={activeNavLinks.items ? "#292727" : "#718096"} d="M3.501 13v0c-0 0-0.001 0-0.001 0-0.276 0-0.5 0.224-0.5 0.5s0.224 0.5 0.5 0.5c0 0 0.001-0 0.001-0v0h9.498v-1h-9.498z"></path>
          </svg>
          <Link to={`${pathUrl}/items`}  className="pl-3 text-xl" name="items" onClick={handleNavClick}>Items</Link></li>
        <li className={activeNavLinks.authors ? `${navbarLinks} ${activeNavLinks.authors}` : navbarLinks}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 12 16">
            <path fill={activeNavLinks.authors ? "#292727" : "#718096"} d="M0 16c2-6 7.234-16 16-16-4.109 3.297-6 11-9 11s-3 0-3 0l-3 5h-1z"></path>
          </svg>
          <Link to={`${pathUrl}/authors`}  className="pl-3 text-xl" name="authors" onClick={handleNavClick}>Authors</Link></li>
        <li className={activeNavLinks.settings ? `${navbarLinks} ${activeNavLinks.settings}` : navbarLinks}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 18 16">
            <path fill={activeNavLinks.settings ? "#292727" : "#718096"} d="M15.671 12.779l-7.196-6.168c0.335-0.63 0.525-1.348 0.525-2.111 0-2.485-2.015-4.5-4.5-4.5-0.455 0-0.893 0.068-1.307 0.193l2.6 2.6c0.389 0.389 0.389 1.025 0 1.414l-1.586 1.586c-0.389 0.389-1.025 0.389-1.414 0l-2.6-2.6c-0.125 0.414-0.193 0.852-0.193 1.307 0 2.485 2.015 4.5 4.5 4.5 0.763 0 1.482-0.19 2.111-0.525l6.168 7.196c0.358 0.418 0.969 0.441 1.358 0.052l1.586-1.586c0.389-0.389 0.365-1-0.052-1.358z"></path>
          </svg>
          <Link to={`${pathUrl}/settings`} className="pl-3 text-xl" name="settings" onClick={handleNavClick}>Settings</Link></li>
      </ul>
    </div>
    );
}
