import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from '../components/Nav';
import Spinner from '../components/Spinner';
import SearchAuthors from '../components/SearchAuthors';
import useSearchAuthor from '../customhooks/useSearchAuthor';
import SingleWork from '../components/SingleWork';
export default function ListAuthors(){
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function search() {
    const [firstName, lastName ] = input.split(' ');
    // const url = `https://reststop.randomhouse.com/resources/authors?lastName=${lastName}&firstName=${firstName}`;
    const url = `https://reststop.randomhouse.com/resources/works/?start=0&max=3&expandLevel=1&search=${input}`
    setLoading(true);
    setHasError(false);
    const results = await axios.get(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if(results.data && results.status == 200){
      setLoading(false);
      if (results.data.work){
       setSearchResults(results.data.work);
      }else{
        setHasError(true);
      }
    }
  }

  const { handleSubmit, input, handleInputChange } = useSearchAuthor(search);

  const sideButtons = {
    text: 'signup',
    className: 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-orange-400 rounded shadow',
  }

  return (
    <div className="w-full">
      <Nav sideButtons={sideButtons}/>
      <div className="relative bg-white overflow-hidden">
        <div className="flex flex-col items-center justify-center  h-64">
          <SearchAuthors
           handleChange={handleInputChange} searchTerm={input}
            search={handleSubmit}
          />
          {hasError && <div className="md:flex max-w-screen-md mx-auto m-6"><p className="text-2xl">No Records Found for This Author</p></div>}
        </div>
        {loading && <Spinner />}

      </div>
      
      {
        searchResults.length && searchResults.map(work => 
          <SingleWork key={work.workid} work={work}/>
        )
      }
    </div>
  )
}
