import React, { useState, useContext, useEffect } from 'react';

import Spinner from '../components/SpinnerBox';
import User from '../components/User';

import userService from '../services/user.service';
import toastNotify from '../utilities/toaster';
import { store } from '../store';

export default function Users(props) {
  const [users, setUsers ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const stores = useContext(store);
    useEffect(() => {
      async function loadUsers() {
        const base_url = process.env.SERVER_API;
        const token = localStorage.getItem('penguinAppToken');
        const results = await userService.getAllUsers(token, base_url);
        if (results.status == 'success' && results.users.length) {
          toastNotify('info', 'users', 'Users fetched', 'topRight');
          setLoading(false);
          setUsers(results.users);
        }
        if (results.status == 'error') {
          setLoading(false);
          const errorMessage = results.errorPayload ? results.errorPayload.message : 'Server error occered';
          if (!errorMessage) {
            Object.values(results.errorPayload).map(invalidInput => {
              toastNotify('error', 'Error', invalidInput.join(""), 'topRight');
            })
          } else {
            toastNotify('error', 'Error', errorMessage, 'topRight');
          }
          setHasError(true);
        }

      }

      loadUsers();

    },[]);

  return (
    <div className="mx-auto" >
      <p className="text-2xl mb-12">Library Users</p>
      {loading && <Spinner customClass={'user-spinner mx-64 my-32'} height={'2em'} width={'3.8em'}/>}
      {users.length > 0 && users.map(user => <User key={user.id} user={user} />)}

    </div>
  );
}
