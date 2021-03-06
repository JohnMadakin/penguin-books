import React, { useState, useContext } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";

import { store } from '../store';
import localStorageApI from '../utilities/localstorage';

import Modal from './Modal';
import Login from '../pages/Login';
import Button from './Button';

import images from '../assets/images'
import '../assets/styles/nav.css';
import toastNotify from '../utilities/toaster';

import x from '../assets/images/penguin_logo2.jpg'
export default function Nav() {
  const sideButtons = {
    text: 'Create New User',
    className: 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-orange-400 shadow',
  };
  const user = useContext(store);
  let history = useHistory();

  const [ showModal, setShowModal ] = useState(false);


  function handleModal(){
    setShowModal(true);
  }

  function handleCloseModal(event){
    event.stopPropagation();
    if (event.target.dataset.close == 'close'){
      setShowModal(false);
    }
  }

  function logout(){
    toastNotify('info', 'Logged Out', 'User successfully Logged out', 'topRight');
    localStorageApI.remove('penguinAppToken');
    localStorageApI.remove('userDetails');
    dispatch({ type: 'logout', payload: { isAuthenticated: false } });
    history.push('/');
  }

  const { dispatch } = useContext(store);

  return (

    <div className="navbar lg:p-6 shadow">
      <nav className="flex flex-row justify-between lg:px-12">
        <div className="flex flex-row">
          <span className="navbar-logo lg:mr-12"><Link to="/"><img alt="logo" src={'/static/media/penguin_logo2.jpg'} className="h-8 w-auto sm:h-10" /> <span>Penguin Library Management System</span></Link></span>
          <ul className="flex flex-row">
            <li className="navbar-links py-2 px-4">
              <Link to="#">Search Authors</Link>
            </li>
            <li className="navbar-links py-2 px-4">
              <Link to="#">Best Sellers</Link>
            </li>
            <li className="navbar-links py-2 px-4">
              <a className="navbar-links-login" onClick={user.isAuthenticated ? () => logout() : () => handleModal()}>{user.isAuthenticated ? 'Logout' : 'Admin Login'}</a>
            </li>
          </ul>
        </div>
        <div>
          <Button textName= {sideButtons.text} className={sideButtons.className}/>
        </div>
      </nav>

      {
        showModal && 
        // <div className="xl:w-1/3 sm:w-auto md:w-full lg:w-32 h-64 z-10">
        <Modal animationClass={showModal ? "open-modal-animation" : "close-modal-animation"} handleCloseModal={(e) => handleCloseModal(e)}>
          <Login handleCloseModal={(e) => handleCloseModal(e)}></Login>
          </Modal>
        // </div>
      }
    </div>
  );
}
