import React from 'react';
import {
  Link
} from "react-router-dom";

import Button from './Button';
import images from '../assets/images'
import '../assets/styles/nav.css';

export default function Nav(props) {
  const { sideButtons } = props;
  return (

    <div className="navbar lg:p-6 shadow">
      <nav className="flex flex-row justify-between lg:px-12">
        <div className="flex flex-row">
          <span className="lg:mr-12"><Link to="/"><img alt="logo" src={images.logo} className="h-8 w-auto sm:h-10" /></Link></span>
          <ul className="flex flex-row">
            <li className="navbar-links py-2 px-4">
              <Link to="/authors">Search Authors</Link>
            </li>
            <li className="navbar-links py-2 px-4">
              <Link to="/best-sellers">Best Sellers</Link>
            </li>
            <li className="navbar-links py-2 px-4">
              <Link to="/login" className="navbar-links-login">Login</Link>
            </li>

          </ul>
        </div>
        <div>
          <Button textName= {sideButtons.text} className={sideButtons.className}/>
        </div>
      </nav>
    </div>
  );
}
