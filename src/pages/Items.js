import React, { useState, useContext, useEffect } from 'react';
import ModalForm from '../components/ModalForm';
import ItemForm from '../components/ItemForm';
import Spinner from '../components/SpinnerBox';
import Item from '../components/Item';
import Button from '../components/Button';

import localStore from '../utilities/constants';
import itemService from '../services/item.service';
import toastNotify from '../utilities/toaster';
import { store } from '../store';

export default function Items(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addItemModal, setAddItemModal ] = useState(false);
  const [hasError, setHasError] = useState(false);
  const stores = useContext(store);

  // function addItem(){
  //   console.log('🔥')
  //   setAddItemModal(true);
  // }

  function toggleAddItemModal(e) {
    e.preventDefault();
    setAddItemModal(!addItemModal);
  }


  useEffect(() => {
    async function loadItems() {
      const base_url = 'http://localhost:8088' || 'https://ralph-waldo-library-api.herokuapp.com';
      const token = localStorage.getItem('penguinAppToken');
      const results = await itemService.getAllItems(token, base_url);
      if (results.status == 'success' && results.items.length) {
        toastNotify('info', 'items', 'Library items fetched', 'topRight');
        setLoading(false);
        setItems(results.items);
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
          setHasError(true);
        }
        
      }

    }

    loadItems();

  }, []);

  return (
    <div className="mx-auto w-full" >

      {addItemModal && <ModalForm toggleModal={(e) => toggleAddItemModal(e)} toggle={addItemModal} modalTitle={"Add a Library Item"}>
        <ItemForm itemStates={localStore.states} itemCategories={localStore.categories}/>
      </ModalForm>}

      <div className="flex flex-row justify-between w-full"><p className="text-2xl mb-12">Library Items</p> 
        <Button className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 h-10 border border-gray-400 shadow"} handleSubmit={(e) => toggleAddItemModal(e)} textName={"Add new item"} />
      </div> 
      {hasError && <h1>Network Error Occured</h1>}
      {loading && <Spinner customClass={'item-spinner mx-64 my-32'} height={'2em'} width={'3.8em'} />}
      <div className="flex flex-row flex-wrap justify-start content-start w-auto h-full">
        {items.length > 0 && items.map(item => <Item key={item.itemCode} item={item} containerClassName={''} />)}
      </div>

    </div>
  );
}
