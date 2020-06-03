import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Spinner from '../components/SpinnerBox';
import User from '../components/User';

import userService from '../services/user.service';
import toastNotify from '../utilities/toaster';
import { store } from '../store';

export default function Users(props) {
  const history = useHistory();
  const [users, setUsers ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const stores = useContext(store);

  async function handleItemBorrowedClick(e) {
    e.stopPropagation();

    const userId = e.currentTarget.dataset.id;
    // console.log('-----id-----', userId)

    history.push({
      pathname: `${props.match.url}/${userId}/items`,
      user: e.currentTarget.dataset.userfirstname
    })
  }

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
      <div className="border-solid border-b border-gray-400 mx-3 mb-6 p-5">
        <p className="text-2xl">Library Users</p>
      </div>
      {loading && <Spinner customClass={'user-spinner mx-64 my-32'} height={'2em'} width={'3.8em'}/>}
      {users.length > 0 && users.map(user => <User handleItemsBorrowed={(e) => handleItemBorrowedClick(e)} key={user.id} user={user} />)}

    </div>
  );
}
