import React, { useState } from 'react';

import '../assets/styles/user.css';

export default function User(props) {
  const { containerClassName, user, handleItemsBorrowed } = props;
  const [ showAddress, setShowAddress ] = useState(false);
  const [activeRow, setActiveRow] = useState(false);
  const [userItemView, setUserItemView] = useState(false);
  const { name, id, userName, email, address, dateJoined } = user;

  const [ firstname, lastname ] = name ? name.split(' ') : [];

  const addressStyle = 'user-list-address-content p-5 h-32';
  const rowStyle = 'user-list-row flex flex-row justify-between xl:w-full p-3';
  const tooltipClassName = "item-card-edit-tooltip";

  function handleClick(e){
    setShowAddress(!showAddress);
    setActiveRow(!activeRow);
  }

  function switchItemView(){
    setUserItemView(!userItemView)
  }

// divide-x-2 divide-gray-400
  return (
    <div className={`${containerClassName} mx-3`} >
      <div className={activeRow ? `${rowStyle} active border-b-0` : `${rowStyle}`} onClick={handleClick}>
        <div className="user-list-row-item p-5 mb-2  xl:w-48" >{firstname ? firstname : ''}</div>
        <div className="user-list-row-item p-5 mb-2  xl:w-48">{lastname ? lastname : ''}</div>
        <div className="user-list-row-item p-5 mb-2 xl:w-48">{ email ? email : 'User has no email'}</div>
        <div className="user-list-row-item p-5 mb-2  xl:w-48 relative" onMouseEnter={() => switchItemView()} onMouseLeave={() => switchItemView()} data-id={id} data-userfirstname={firstname} onClick={(e) => handleItemsBorrowed(e)}><svg className="float-right" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill={!userItemView ? "#000000" : '#f2a36e'} d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
        </svg> <span className={userItemView ? `${tooltipClassName} show-tooltip` : tooltipClassName}>View Items Borrowed by {firstname}</span>
        </div>
       
      </div>
      <div id="addr" className={showAddress ? `${addressStyle} address-content-visible ` : `${addressStyle} remove`} > Address: {address ? address : ''}
      <br/>
      <span>Registration Date: {dateJoined}</span>
      </div>
    </div>
  );
}
