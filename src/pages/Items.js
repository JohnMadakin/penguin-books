import React, { useState, useContext, useEffect } from 'react';
import ModalForm from '../components/ModalForm';
import ItemForm from '../components/ItemForm';
import Spinner from '../components/SpinnerBox';
import Item from '../components/Item';
import Button from '../components/Button';

import localStore from '../utilities/constants';
import itemService from '../services/item.service';
import authorService from '../services/author.service'
import toastNotify from '../utilities/toaster';
import '../assets/styles/itemsList.css';
import { store } from '../store';

export default function Items(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addItemModal, setAddItemModal ] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [refreshItems, setRefereshItem] = useState(false);
  const stores = useContext(store);


  function toggleAddItemModal(e) {
    // e.preventDefault();
    e.persist();
    setAddItemModal(!addItemModal);
    setEditStatus(false);

  }

  function updateAuthors(author){
    const updatedAuthors = [author, ...authors];
    setAuthors(updatedAuthors);
  }

  function editItem(index){
    setAddItemModal(!addItemModal);
    setEditStatus(true);
    setSelectedItem(items[index]);
  }

  function handleRefreshItems(){
    setRefereshItem(!refreshItems);
  }


  useEffect(() => {
    async function loadItems() {
      const base_url = process.env.SERVER_API;
      //'http://localhost:8088' || 'https://ralph-waldo-library-api.herokuapp.com';

      const token = localStorage.getItem('penguinAppToken');
      const [itemsResults, authorResults] = await Promise.all(
        [
          itemService.getAllItems(token, base_url),
          authorService.getAllAuthors(token, base_url),
        ]
      );

      if (authorResults.status == 'success' && authorResults.authors.length){
        setAuthors(authorResults.authors);
      }

      if (itemsResults.status == 'success' && itemsResults.items.length) {
        toastNotify('info', 'items', 'Library items fetched', 'topRight');
        setLoading(false);
        setItems(itemsResults.items);
      }
      if (itemsResults.status == 'error') {
        setLoading(false);
        const errorMessage = itemsResults.errorPayload ? itemsResults.errorPayload.message : 'Server error occered';
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

  }, [refreshItems]);

  return (
    <div className="mx-auto w-full" >

      {addItemModal && <ModalForm   toggle={addItemModal} modalTitle={"Add a Library Item"}>
        <ItemForm toggleModal={(e) => toggleAddItemModal(e)} itemStates={localStore.states} itemCategories={localStore.categories} authors={authors} updateAuthors={updateAuthors}
          itemTypes={localStore.types} itemConditions={localStore.conditions} singleItem={selectedItem} editStatus={editStatus} refreshItems={() => handleRefreshItems() }/>
      </ModalForm>}

      <div className="flex flex-row justify-between w-full"><p className="items-hero-text text-2xl mb-12">Library Items</p> 
        <Button className={"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 h-10 border border-gray-400 shadow"} handleSubmit={(e) => toggleAddItemModal(e)} textName={"Add new item"} />
      </div> 
      {hasError && <h1>Network Error Occured</h1>}
      {loading && <Spinner customClass={'item-spinner mx-64 my-32'} height={'2em'} width={'3.8em'} />}
      <div className="flex flex-row flex-wrap justify-start content-start w-auto h-full">
        {items.length > 0 && items.map((item, index) => <Item key={`${item.itemId}-${item.isbn}`} item={item} containerClassName={''} index={index} editItem={(e) => editItem(e)} />)}
      </div>

    </div> 
  );
}
