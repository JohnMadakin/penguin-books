import React, { useState, useContext } from 'react';
import {
  useHistory,
} from "react-router-dom";

import { store } from '../store';
import auth  from '../services/login.service';
import decodeJWT from '../utilities/decodeJWT';

import Button from '../components/Button';
import Input from '../components/Input';
import Spinner from '../components/SpinnerBox';

import useAdminLogin from '../customhooks/useAdminLogin';
import localStorageAPI from '../utilities/localstorage';


import '../assets/styles/modal.css';
import '../assets/styles/login.css';
import toastNotify from '../utilities/toaster';

export default function Login(props) {
  let history = useHistory();
  // let location = useLocation();
  const { handleCloseModal } = props;
  const [isloading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  async function login(){
    setLoading(true);
    const base_url = 'http://localhost:8088' || 'https://ralph-waldo-library-api.herokuapp.com';
    const results = await auth.loginService(email, password, base_url);
    setLoading(false);
    if (results.status == 'success' && results.token) {
      toastNotify('info', 'Login', 'Login successful', 'topRight');
      setLoading(false);
      const userPayload = decodeJWT(results.token);
      setIsAuthenticated(true);
      const payload = {
        penguinAppToken: results.token,
        userDetails: userPayload,
      }
      localStorageAPI.save(payload);
      dispatch({ type: 'auth', payload: { isAuthenticated: true, userDetails: userPayload } });
      history.push('/dashboard');
    }
    if(results.status == 'error'){
      setLoading(false);
      const errorMessage = results.errorPayload ? results.errorPayload.message : 'Server error occured';
      if (!errorMessage) {
        Object.values(results.errorPayload).map(invalidInput => {
          toastNotify('error', 'Error', invalidInput.join(""), 'topRight');
          })
        }else{
          toastNotify('error', 'Error', errorMessage, 'topRight' );
        }
        setHasError(true);
    }
  }
  const { handleSubmit, handleEmailChange, handlePasswordChange, userDetails: { email, password } } = useAdminLogin(login);
  const { dispatch } = useContext(store);


  return (
      <div className="login-wrapper h-64 w-11/12 z-20" onClick={handleCloseModal}>
        <form className="login-form z-30" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="login-text text-xl">ADMIN LOGIN</h1>
          <Input type={"text"} placeholder={"Email"} className={"login-form-username mt-3"} handleChange={(e) => handleEmailChange(e)} />
          <Input type={"password"} placeholder={"Password"} className={"login-form-password"} handleChange={(e) => handlePasswordChange(e)} />
        <div className="login-button-container">
          { !isloading ? <Button textName={"sign in"} className={"login-button"} /> : <Spinner customClass={'login-spinner'} height={'0.8em'} width={'1.8em'}/> }
            <span className="login-password-reset">password reset</span>
          </div>
        </form>
      </div>
  );
}

