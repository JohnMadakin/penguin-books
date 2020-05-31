import React, { useState, useEffect } from 'react';

import Button from '../components/Button';
import Spinner from '../components/SpinnerBox';

import AuthorService from '../services/author.service';
import ItemService from '../services/item.service';
import constants from '../utilities/constants';
import images from '../assets/images';
import '../assets/styles/itemform.css';
import toastNotify from '../utilities/toaster';


export default function ItemsForm(props){
  const token = localStorage.getItem('penguinAppToken');
  const base_url = process.env.SERVER_API;
  const { itemStates, itemCategories, authors, updateAuthors, toggleModal, itemTypes, itemConditions, editStatus, singleItem, refreshItems } = props;
  const [formErrors, setFormErrors] = useState(constants.formErrorStates);
  const [showAuthors, setShowAuthors] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [viewAddAuthorForm, setViewAddAuthorForm] = useState(false);
  const [confirmAuthorSubmission, setConfirmAuthorSubmission] = useState(false);
  const [authorText, setAuthorText] = useState('');
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [localAuthors, setLocalAuthors] = useState(authors);

  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    authorId: null,
    itemTypeId: 1,
    categoryId: null,
    itemStateId: 1,
    numberInStock: 1,
    description: '',
    itemCondition: null,

  });

  // if (editStatus){
  //   setFormData({
  //     title: singleItem.title,
  //     isbn: singleItem.isbn,
  //     authorId: singleItem.author,
  //     itemTypeId: 1,
  //     categoryId: null,
  //     itemStateId: 1,
  //     numberInStock: 1,
  //     description: '',
  //   });
  // }


  function handleFilteredAuthors(e){
    e.preventDefault();
    if (localAuthors[0].id == "0"){
      setLocalAuthors(authors);
    }else{
      const filteredAuthors = localAuthors.filter(author => author.name.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1);

      setLocalAuthors(filteredAuthors.length ? filteredAuthors : [{ id: "0", name: "Not found" }]);
    }
  }

  function handleShowAuthors(e){
    e.preventDefault();
    setShowAuthors(!showAuthors);
    setViewAddAuthorForm(false);
    setHasError(false);

    if (showAuthors && !selectedAuthor.length){
      return setFormErrors({ ...formErrors, author: true })

    }
    setFormErrors({ ...formErrors, author: false })

  }

  function handleSelectedOptions(e){
    if (e.target.dataset.id != '0'){
      setSelectedAuthor(e.target.dataset.name);
      setFormData({ ...formData, authorId: e.target.dataset.id })
      setFormErrors({ ...formErrors, authorId: false })
      setShowAuthors(!showAuthors);
      setViewAddAuthorForm(false);
      setFormErrors({ ...formErrors, author: false })
    }else{
      setSelectedAuthor('Select Author');
      setShowAuthors(!showAuthors);
      setViewAddAuthorForm(false);
      setFormErrors({ ...formErrors, author: true })
    }
  }

  function handleAddAuthorView(e){
    setViewAddAuthorForm(!viewAddAuthorForm);
    setHasError(false)

  }

  function addAuthorHandler(e){
    e.preventDefault();
    setViewAddAuthorForm(false);
    setConfirmAuthorSubmission(true);
  }

  function handleAuthorTextChange(e){
    setAuthorText(e.target.value);

  }

  function cancelSubmission(e){
    e.preventDefault();
    setConfirmAuthorSubmission(false);
    setViewAddAuthorForm(true);

  }

  function handleTitle(e){
    if(e.target.value.length < 1){
      setFormErrors({...formErrors, title: true});
    }
      setFormData({ ...formData, title: e.target.value});
      setFormErrors({...formErrors, title: false});
  }

  /*
{
    title: true,
    isbn: true,
    author: true,
    categories: true,
    itemState: true,
    number: true,

  }
  */

  function handleCategories(e) {
    if (Number(e.target.value) < 1 ) {
      setFormErrors({ ...formErrors, categories: true });
    }
    setFormData({ ...formData, categoryId: Number(e.target.value) });
    setFormErrors({ ...formErrors, categories: false });
  }

  function handleBookTypes(e) {
    setFormData({ ...formData, itemTypeId: Number(e.target.value) });
    setFormErrors({ ...formErrors, type: false });
  }

  function handleBookStates(e) {
    if (e.target.value < 1) {
      setFormErrors({ ...formErrors, itemState: true });
    }
    setFormData({ ...formData, itemStateId: Number(e.target.value) });
    setFormErrors({ ...formErrors, itemState: false });
  }


  function handleIsbn(e){
    if(!e.target.value.length){
      setFormErrors({...formErrors, isbn: true});
    }
    setFormData({ ...formData, isbn: e.target.value });
    setFormErrors({ ...formErrors, isbn: false })
  }

  async function submitAuthor(e){
    e.preventDefault();
    setConfirmAuthorSubmission(false);
    setLoadingAuthors(true);

    const result = await AuthorService.addAuthor(token, authorText, base_url);

    if(result.status == 'success'){
      updateAuthors({ id: result.data.id, name: authorText });
      setLoadingAuthors(false);
      setSelectedAuthor(authorText);
      setShowAuthors(!showAuthors);
      setViewAddAuthorForm(false);
      setFormData({ authorId: result.data.id });
    }else{
      setHasError(true);
      setLoadingAuthors(false);
      setViewAddAuthorForm(false);
    }
  }

  function handleItemConditions(e){
    if(!e.target.value.length){
      setFormErrors({ ...formErrors, conditions: true});
    }

    setFormData({ ...formData, itemCondition: e.target.value });
    setFormErrors({ ...formErrors, conditions: false })

  }

    function handleDescription(e){
    setFormData({ ...formData, description: e.target.value });
    setFormErrors({ ...formErrors, description: false })

  }



  function handleNumberOfItems(e){
    setFormData({ ...formData, numberInStock: Number(e.target.value) });
    setFormErrors({ ...formErrors, numberInStock: false })

  }

  async function editItems(e){
    e.preventDefault();

    const payload = { itemId: singleItem.itemId, ...formData}
    const results = await ItemService.editItem(payload, token, base_url);
    if (results.status == 'success') {
      toastNotify('info', 'Items Update', 'Item Edited', 'topRight');
      setLoadingAuthors(false);
      refreshItems();
      toggleModal(e);
    } else {
      const errorMessage = results.errorPayload ? results.errorPayload.message : 'Server error occured';
      setHasError(true);
      setLoadingAuthors(false);

      if (!errorMessage) {
        Object.values(results.errorPayload).map(invalidInput => {
          toastNotify('error', 'Error', invalidInput.join(""), 'topRight');
        })
      } else {
        toastNotify('error', 'Error', errorMessage, 'topRight');
      }

    }
  }

  async function submitItems(e){
    e.preventDefault();
    let formErrorsOccured = false;
    Object.keys(formErrors).map(key => {
      if(formErrors[key]){
        formErrorsOccured = true;
      }
    });

    if (!formErrorsOccured){
      const results = await ItemService.postItem(formData, token, base_url);
      if (results.status == 'success') {
        toastNotify('info', 'Items', 'Item Saved', 'topRight');
        setLoadingAuthors(false);
        refreshItems();
        toggleModal(e);
      } else {
        const errorMessage = results.errorPayload ? results.errorPayload.message : 'Server error occured';
        setHasError(true);
        setLoadingAuthors(false);

        if (!errorMessage) {
          Object.values(results.errorPayload).map(invalidInput => {
            toastNotify('error', 'Error', invalidInput.join(""), 'topRight');
          })
        } else {
          toastNotify('error', 'Error', errorMessage, 'topRight');
        }

      }
    }else {
      toastNotify('error', 'Error', 'One or more required fields have not been filled', 'topRight');

    }
  }

  useEffect(function(){
    if(editStatus){
      let authorIdEdit = null;
      let catId = null;
      let typeId = null;

      constants.categories.map(cat => {
        if (cat.name.toUpperCase() === singleItem.itemCategory.toUpperCase()) {
          catId = cat.id;
        }

      });
      constants.types.map(itemType => {
        if (itemType.name.toUpperCase() === singleItem.itemType.toUpperCase()) {
          typeId = itemType.id;
        }
      });
      authors.map(author => {
        if (author.name.toUpperCase() === singleItem.author.toUpperCase()){
          authorIdEdit = author.id;
        }
      })
      setSelectedAuthor(singleItem.author);
      setFormData({
        ...formData,
        title: singleItem.title,
        isbn: singleItem.isbn,
        authorId: authorIdEdit,
        categoryId: catId,
        itemTypeId: typeId,
        description: singleItem.description,
      });

    }
  }, [])

  

  return (
    <form className="w-full max-w-lg" onSubmit={(e) => editStatus ? editItems(e) : submitItems(e)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title</label>
          <input className={"appearance-none block w-full bg-gray-200 text-gray-700 border  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" + ((!formErrors.title || editStatus) ? '' : ' border-red-500')} name="title" type="text" placeholder="item title" onChange={(e) => handleTitle(e)} defaultValue={editStatus ? singleItem.title : ''}  />
          {(formErrors.title && !editStatus) && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
      </div>
          <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">ISBN</label><input className={"appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" + (!formErrors.isbn || editStatus ? '' : ' border-red-500')} name="isbn" type="text" placeholder="isbn" onChange={(e) => handleIsbn(e)} defaultValue={editStatus ? singleItem.isbn : ''} />
          {(formErrors.isbn && !editStatus) && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
      </div>
          </div>
          <div className="flex flex-wrap mb-6">

        <div className="item-form-dropdown md:w-1/2 ">
          <button className={"item-form-dropbtn flex flex-row justify-between w-48 items-center bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 shadow"}
          onClick={(e) => handleShowAuthors(e)} > {selectedAuthor.length ? selectedAuthor : 'Select Authors'}
            {!showAuthors ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="#2d3748" d="M16 8c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8zM1.5 8c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5z"></path>
              <path fill="#2d3748" d="M4.957 5.543l-1.414 1.414 4.457 4.457 4.457-4.457-1.414-1.414-3.043 3.043z"></path>
            </svg> : <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="#2d3748" d="M0 8c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8-8 3.582-8 8zM14.5 8c0 3.59-2.91 6.5-6.5 6.5s-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5 6.5 2.91 6.5 6.5z"></path>
                <path fill="#2d3748" d="M11.043 10.457l1.414-1.414-4.457-4.457-4.457 4.457 1.414 1.414 3.043-3.043z"></path>
              </svg>}
          </button>
          {(formErrors.author && !editStatus) && <p className="text-red-500 text-xs italic mt-2">Required</p>}
          <div className={showAuthors ? "item-form-dropdown-content show" : "item-form-dropdown-content"}>
            <input className="dropdown-content-input" style={{ backgroundImage: `url(/${images.search_icon})` }}  type="text" placeholder="Search.." onKeyUp={(e) => handleFilteredAuthors(e)} />
            <br/>
            <span className="dropdown-add-author-b item-form-dropdown-content-items bg-white hover:bg-gray-100 text-gray-800 font-semibold" onClick={(e)=> handleAddAuthorView(e)}>add a new author</span>{/*hover:bg-gray-100*/}
            {
            viewAddAuthorForm && <span className="item-form-dropdown-content-items dropdown-add-author  bg-white  text-gray-800 font-semibold  hover:bg-white"><input className="dropdown-add-author-input focus:outline-none focus:bg-white bg-white hover:bg-white" onChange={(e)=>handleAuthorTextChange(e)} placeholder="Enter Author Name" />
              <Button className="dropdown-add-author-button hover:opacity-100 hover:shadow px-3 py-2"  textName="add" handleSubmit={(e) => addAuthorHandler(e)} /> 
              </span>
             
            }
            { hasError && <em className="dropdown-add-author-message">Error Occured while trying to create Author</em>
}
              {
              confirmAuthorSubmission && <span className="flex flex-row justify-between item-form-dropdown-content-items">
                <Button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 h-10 border border-gray-400 shadow" textName={"No"} handleSubmit={(e) => cancelSubmission(e)} />
                <Button className="bg-orange-400 opacity-80 text-gray-800 font-semibold py-2 px-4 h-10 border hover:opacity-100 hover:shadow" handleSubmit={(e) => submitAuthor(e)} textName={"Yes"} />
                </span>
              }
              {
              loadingAuthors && <Spinner customClass={'add-author-spinner'} height={'0.8em'} width={'1.8em'} />
              }
            <div className="overflow-y-auto h-32">
              {localAuthors.map(author => <span className="item-form-dropdown-content-items" onClick={(e) => handleSelectedOptions(e)} data-id={author.id} data-name={author.name} key={author.id}>{author.name}</span>)}
              </div>
          </div>
        </div>
          
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item Category</label> */}
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => handleCategories(e)} required>
              <option value="0"> Item Category</option>
              {itemCategories.map(category => {
                
                if (editStatus && category.name.toUpperCase() === singleItem.itemCategory.toUpperCase()){
                  return <option selected value={category.id} key={category.id}>{category.name}</option>
                }
                return <option value={category.id} key={category.id}>{category.name}</option>
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>

          </div>
          {(formErrors.categories && !editStatus) && <p className="text-red-500 text-xs italic mt-2">Required</p>}
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mb-0" style={{ display: editStatus ? 'none' : 'block' }}>
          {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item Category</label> */}
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  onChange={(e) => handleItemConditions(e)} required>
              <option defaultValue=" " >Item  Condition</option>
              {itemConditions.map(condition => <option value={condition.name} key={condition.id}>{condition.name}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>

          </div>
          {(formErrors.conditions && !editStatus) && <p className="text-red-500 text-xs italic mt-2">Required</p>}
        </div>

            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue ={editStatus ? singleItem.description : ''} onChange={(e) => handleDescription(e)} type="text" placeholder="Max lenght of 500 characters" rows="3" cols="20"></textarea>
                <p className="text-gray-600 text-xs italic">Make it descriptive as possible</p>
              </div>
            </div>


            <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0" style={{ display: editStatus ? 'none' : 'block' }}><label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Number of items</label><input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => handleNumberOfItems(e)} type="number" min="1" defaultValue="1" /></div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item Type</label>
                  <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => handleBookTypes(e)}>
              {itemTypes.map(itemType => {
                if (editStatus && itemType.name.toUpperCase() === singleItem.itemType.toUpperCase()) {
                  return <option selected value={itemType.id} key={itemType.id}>{itemType.name}</option>
                }

                return <option value={itemType.id} key={itemType.id}>{itemType.name}</option>}
              )}

                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0" style={{ display: editStatus ? 'none' : 'block' }}>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Item State</label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => handleBookStates(e)}>
              {itemStates.map(itemState => <option value={itemState.id} key={itemState.id}>{itemState.name}</option>)}

            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
              </svg>
            </div>
          </div>
        </div>
                

          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 bg-transparent p-3 text-orange-500 hover:bg-gray-100 hover:text-orange-400 mr-2">Save</button>
            <button className="modal-close px-4 bg-orange-500 p-3 text-white hover:bg-orange-400" onClick={toggleModal}>Cancel</button>
          </div>

      </form>
  )
}

