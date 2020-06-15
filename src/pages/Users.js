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
    //get currentTarget
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
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="28" height="28" viewBox="0 0 16 24">
        <path fill="#000000" d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
        <path fill="#000000" d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path>
      </svg>
        <span className="text-2xl">Library Users</span>
      </div>
      {loading && <Spinner customClass={'user-spinner'} height={'2em'} width={'3.8em'}/>}
      {users.length > 0 && users.map(user => <User handleItemsBorrowed={(e) => handleItemBorrowedClick(e)} key={user.id} user={user} />)}

    </div>
  );
}
