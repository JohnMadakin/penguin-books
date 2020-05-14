import React, { useState } from 'react';

import '../assets/styles/user.css';

export default function User(props) {
  const { containerClassName, user } = props;
  const [ showAddress, setShowAddress ] = useState(false);
  const [activeRow, setActiveRow] = useState(false);

  const { name, userName, email, address, dateJoined } = user;

  const [ firstname, lastname ] = name ? name.split(' ') : [];

  const addressStyle = 'user-list-address-content p-5 h-32';
  const rowStyle = 'user-list-row flex flex-row justify-between xl:w-full  border-b-2';
  function handleClick(e){
    setShowAddress(!showAddress);
    setActiveRow(!activeRow);
  }
// divide-x-2 divide-gray-400
  return (
    <div className={containerClassName} >
      <div className={activeRow ? `${rowStyle} active border-b-0` : `${rowStyle}`} onClick={handleClick}>
        <div className="user-list-row-item p-5 mb-2  xl:w-48" >{firstname ? firstname : ''}</div>
        <div className="user-list-row-item p-5 mb-2  xl:w-48">{lastname ? lastname : ''}</div>
        <div className="user-list-row-item p-5 mb-2 xl:w-48">{ email ? email : 'User has no email'}</div>
      </div>
      <div id="addr" className={showAddress ? `${addressStyle} address-content-visible ` : `${addressStyle} remove`} > Address: {address ? address : ''}
      <br/>
      <span>Registration Date: {dateJoined}</span>
      </div>
    </div>
  );
}
