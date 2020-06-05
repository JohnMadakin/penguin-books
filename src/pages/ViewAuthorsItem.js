import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory, useParams } from 'react-router-dom';

import itemService from '../services/item.service';
import toastNotify from '../utilities/toaster';
import routes from '../routes/childrenRoutes';

import Author from '../components/Author';
import Item from '../components/Item';
import Spinner from '../components/SpinnerBox';
import empty_data from '../assets/images/empty.svg';

export default function ViewAuthorsItem(props) {
  const location = useLocation();
  const history = useHistory();
  const [items, setAuthorsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const base_url = process.env.SERVER_API;
  const token = localStorage.getItem('penguinAppToken');

  const { authorId } = useParams();

  function handleBackClick(e){
    history.push('/dashboard/authors');
  }
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const url = `${base_url}/api/v1/authors/${authorId}/items`;
    setAuthorName(location.author)

    async function loadAuthorItems() {
      const result = await itemService.getAuthorItems(token, url);

      if (result.status == 'success' && result.items.length) {
        setAuthorsItems(result.items);
        toastNotify('info', 'items', "Author's items fetched", 'topRight');
        setLoading(false);
      }

      if (result.status == 'error') {
        setLoading(false);
        const errorMessage = result.errorPayload ? result.errorPayload.message : 'Server error occered';
        if (!errorMessage) {
          toastNotify('error', 'Error', "Error occured while getting author's items", 'topRight');

        } else {
          toastNotify('error', 'Error', errorMessage, 'topRight');
          setHasError(true);
        }

      }
      setLoading(false);

    }

    loadAuthorItems();
    return function cleanup() {
      source.cancel();
    }
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap flex-row justify-between mx-3 mb-6 p-5  w-11/12 border-solid border-b border-gray-400 text-2xl"> 
        <div className="flex flex-wrap flex-row w-64">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 640 640">
            <path fill="#000" d="M136.128 626.144c9.824-31.424 24.64-75.648 44.512-139.584 86.624-13.728 122.464 10.912 177.472-87.328-44.64 13.664-98.464-25.344-95.584-42.272 2.912-16.896 125.216 12.192 205.312-101.536-100.96 22.272-133.248-26.752-120.224-34.144 30.048-17.088 119.232-7.104 166.784-53.408 24.512-23.84 36-81.792 26.016-102.464-11.968-24.992-84.992-62.272-125.248-58.752-40.256 3.488-103.392 153.28-122.144 152.128-18.688-1.184-22.496-67.136 10.208-128.416-34.464 15.264-97.632 62.688-117.44 103.232-36.896 75.424 3.456 248.512-9.472 254.656-12.96 6.176-56.512-79.392-69.504-118.208-17.76 59.488-18.176 119.072 33.696 198.208-19.552 51.936-30.24 111.712-31.872 142.112-0.768 24.288 23.168 29.504 27.488 15.776z"></path>
          </svg><span style={{ fontSize: '1.5rem' }}>{authorName}</span>
        </div>
        <label className="item-return-button " aria-hidden="true" onClick={(e) => handleBackClick(e)}>
          {/* <span className="item-card-icon-span"> */}
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
            <path fill="#141C2C" d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>
          </svg>
        </label>
      </div>
      <div className="mx-auto w-full flex flex-wrap flex-row" >
        {hasError && <h1>Network Error Occured</h1>}
        {loading && <Spinner customClass={'item-spinner mx-64 my-32'} height={'2em'} width={'3.8em'} />}
        {items.length > 0 && items.map((item, index) => <Item key={`${item.itemId}-${item.isbn}`} item={item} containerClassName={''} authorView={true} index={index} />) }
        {(items.length === 0 && !loading) && <div className="w-full flex justify-center items-center h-64 relative" ><div className="w-64 h-64" style={{ backgroundImage: `url(/${empty_data})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div><h1 className="text-2xl">No Items found for this Author 😓</h1>
          </div>}

      </div>
    </div>
  );
}

