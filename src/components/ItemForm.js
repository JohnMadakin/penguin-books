import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

import constants from '../utilities/constants';
import images from '../assets/images';
import '../assets/styles/itemform.css';
export default function ItemsForm(props){
  const a = [
    {
      id: 1,
      name: 'JK Rowling'
    },
    {
      id: 2,
      name: 'Daniel Steel'
    }
  ];
  const { itemStates, itemCategories } = props;
  const [authors, setAuthors] = useState(a);
  const [showAuthors, setShowAuthors] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  function handleFilteredAuthors(e){
    e.preventDefault();
    console.log('==> ', e.target.value, authors)
    const filteredAuthors= a.filter(author => author.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1);
    console.log('11==> ', filteredAuthors)

    setAuthors(filteredAuthors.length ? filteredAuthors : [{ id: 'not-found', name: "Not found"}]);
  }

  function handleShowAuthors(e){
    e.preventDefault();
    setShowAuthors(!showAuthors);
  }

  function handleSelectedOptions(e){
    console.log('🍅', e.target.dataset.id, '🔥', e.target.dataset.name);
    setSelectedAuthor(e.target.dataset.name);
    setShowAuthors(!showAuthors);
  }

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title</label><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="item title"/>
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
      </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">ISBN</label><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="isbn"/>
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
      </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">

        <div className="item-form-dropdown p-2 m-3">
          <button className={"item-form-dropbtn flex flex-row justify-between w-48 items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 h-10 border border-gray-400 shadow"} onClick={(e) => handleShowAuthors(e)} > {selectedAuthor.length ? selectedAuthor : 'Select Authors'}
            {!showAuthors ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="#2d3748" d="M16 8c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zM1.5 8c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5z"></path>
              <path fill="#2d3748" d="M4.957 5.543l-1.414 1.414 4.457 4.457 4.457-4.457-1.414-1.414-3.043 3.043z"></path>
            </svg> : <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="#2d3748" d="M0 8c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8zM14.5 8c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5z"></path>
                <path fill="#2d3748" d="M11.043 10.457l1.414-1.414-4.457-4.457-4.457 4.457 1.414 1.414 3.043-3.043z"></path>
              </svg>}
          </button>
          <div className={showAuthors ? "item-form-dropdown-content show" : "item-form-dropdown-content"}>
            <input className="dropdown-content-input" style={{ backgroundImage: `url(/${images.search_icon})`}} type="text" placeholder="Search.." onKeyUp={(e) => handleFilteredAuthors(e)} />
            <br/>
            <Link to="/dashboard/authors" className="dropdown-add-author item-form-dropdown-content-items bg-white hover:bg-gray-100 text-gray-800 font-semibold">add a new author</Link>
            {authors.map(author => <span className="item-form-dropdown-content-items" onClick={(e) => handleSelectedOptions(e)} data-id={author.id} data-name={author.name} key={author.id}>{author.name}</span>)}
          </div>
        </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Max lenght of 500 characters" rows="8" cols="20"></textarea>
                <p className="text-gray-600 text-xs italic">Make it descriptive as possible</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"><label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Number of items</label><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" min="1" defaultValue="1" /></div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item State</label>
                  <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {itemStates.map(itemState => <option key={itemState.id}>{itemState.name}</option>)}

                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item Category</label>
                  <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {itemCategories.map(category => <option key={category.id}>{category.name}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                </div>
      </form>
  )
}

