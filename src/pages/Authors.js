import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';

import authorService from '../services/author.service';
import itemService from '../services/item.service';
import toastNotify from '../utilities/toaster';

import Author from '../components/Author';
import Spinner from '../components/SpinnerBox';

export default function Authors(props) {
  const history = useHistory();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const base_url = process.env.SERVER_API;
  const token = localStorage.getItem('penguinAppToken');

  async function handleAuthorClick(e){
    const authorId = e.currentTarget.dataset.id;
    history.push({ 
      pathname: `${props.match.url}/${authorId}`, 
      author: e.currentTarget.dataset.authorname 
    })
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function loadAuthors() {

      const author_url = `${base_url}/api/v1/authors?pageSize=10&page=1&sort=name_desc`;

      const authorResults = await authorService.getAllAuthors(token, author_url, source);
      if (authorResults.status == 'success' && authorResults.authors.data.length) {
        setAuthors(authorResults.authors.data);
        toastNotify('info', 'items', 'Authors fetched', 'topRight');
        setLoading(false);
      }

      if (authorResults.status == 'error') {
        setLoading(false);
        const errorMessage = authorResults.errorPayload ? authorResults.errorPayload.message : 'Server error occered';
        if (!errorMessage) {
          Object.values(results.errorPayload).map(invalidInput => {
            toastNotify('error', 'Error', invalidInput.join(""), 'topRight');
          })
        } else {
          toastNotify('error', 'Error', errorMessage, 'topRight');
          setHasError(true);
        }

      }
    }

    loadAuthors();
    return function cleanup() {
      source.cancel();
    }
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-wrap flex-row mx-3 mb-6 p-5  w-full border-solid border-b border-gray-400 text-2xl"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 640">
        <path fill="#000" d="M136.128 626.144c9.824-31.424 24.64-75.648 44.512-139.584 86.624-13.728 122.464 10.912 177.472-87.328-44.64 13.664-98.464-25.344-95.584-42.272 2.912-16.896 125.216 12.192 205.312-101.536-100.96 22.272-133.248-26.752-120.224-34.144 30.048-17.088 119.232-7.104 166.784-53.408 24.512-23.84 36-81.792 26.016-102.464-11.968-24.992-84.992-62.272-125.248-58.752-40.256 3.488-103.392 153.28-122.144 152.128-18.688-1.184-22.496-67.136 10.208-128.416-34.464 15.264-97.632 62.688-117.44 103.232-36.896 75.424 3.456 248.512-9.472 254.656-12.96 6.176-56.512-79.392-69.504-118.208-17.76 59.488-18.176 119.072 33.696 198.208-19.552 51.936-30.24 111.712-31.872 142.112-0.768 24.288 23.168 29.504 27.488 15.776z"></path>
      </svg><span>Authors</span></div>
      <div className="mx-auto w-full flex flex-wrap flex-row" >
        {hasError && <h1>Network Error Occured</h1>}
        {loading && <Spinner customClass={'item-spinner mx-64 my-32'} height={'2em'} width={'3.8em'} />}

        {
          authors.map(author => <div className="authors-list" key={author.id} data-id={author.id} data-authorname={author.name} onClick={(e) => handleAuthorClick(e)}><Author  author={author} /></div>)
        }

      </div>
    </div>
  );
}
