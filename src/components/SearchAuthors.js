import React from 'react';

import Button from './Button';
import '../assets/styles/searchAuthors.css';

export default function SearchAuthors(props) {
  const searchButton = {
    text: 'Search',
    className: 'flex-shrink-0 text-sm border-4 text-white py-1 px-2 rounded search-buttons',
  }


  return (
      <form className="w-full max-w-sm" onSubmit={props.search}>
        <div className="flex items-center border-b border-b-2 border-grey-1000 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search Authors" aria-label="authors" value={props.searchTerm} onChange={props.handleChange}/>
          <Button textName={searchButton.text} className={searchButton.className} />
        </div>
      </form>
  );
}


