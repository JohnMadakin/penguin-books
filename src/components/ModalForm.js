import React, { useState } from 'react';
import '../assets/styles/modalform.css';

export default function ModalForm(props){

  const modalcss = "modal-form modal z-30 fixed w-full h-full top-0 left-0 flex items-center justify-center";


  return (
    <div>
      <div className={props.toggle ? `modal-active ${modalcss} mx-auto` : `${modalcss}  mx-auto`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container  bg-white w-11/12 md:max-w-md mx-auto shadow-lg z-50 overflow-y-auto">

        {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
      <div className="modal-content py-4 text-left px-6">
          {/* <!--Title--> */}
        <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{props.modalTitle}</p>
              <div className="modal-close cursor-pointer z-50" onClick={props.toggleModal}>
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>

          {/* <!--Body--> */}
        {/* <p>Modal content can go here</p>
          <p>...</p>
          <p>...</p>
          <p>...</p>
          <p>...</p> */}
          {props.children}

          {/* <!--Footer--> */}

        </div>
      </div>
    </div>
    </div>

  )
}
