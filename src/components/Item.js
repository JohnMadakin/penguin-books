import React, { useState } from 'react';

import '../assets/styles/item.css';
import images from '../assets/images';


export default function Item(props) {
  const { containerClassName, item, editItem, index, authorView } = props;
  const [flipCard, setFlipCard] = useState(false);
  const [activeRow, setActiveRow] = useState(false);
  const [tooltipEdit, setTooltipEdit ] = useState(false);
  const { title, isbn, totalNumber, itemType, itemCategory, description, itemCode, author, dateAdded, numberInStock } = item;

  const contentStyle = 'item-card-content  w-full h-full';
  const addressStyle = 'item-list-address-content p-5 h-32';
  const rowStyle = 'item-list-row flex flex-col justify-between xl:w-5/12 ';
  const tooltipClassName = "item-card-edit-tooltip";

  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function handleClick(e) {
    setFlipCard(!flipCard);
    setActiveRow(!activeRow);
  }
//
  let g = getRandomNumber(6)
  // divide-x-2 divide-gray-400
  return (
    <div className={`item-card-container h-48  xl:w-64 m-2  shadow ${containerClassName}`}>
      <div className="item-card w-full h-full">
        {/* <input type="checkbox" id="card1" className="more" aria-hidden="true"/> */}
        <div className={flipCard ? `${contentStyle} flip-card` : `${contentStyle}`}>
          <div className="item-card-front  w-full h-full" style={{ backgroundImage: `url(/${images.items_backgrounds[g]})` }} >
            <div className="item-card-inner">
              <h2 className="item-card-title">{item.title}</h2>
              <span>{author}</span>
              <label htmlFor="card1" className="item-card-button" aria-hidden="true" onClick={(e) => handleClick(e)} >
                Details
                </label>
            </div>

          </div>

          {/**------------------------- card back -------------------------------------- */}
          <div className="item-card-back w-full h-full">
            <div className="item-card-back-inner">
              <div className="item-card-info">
                <span className="px-4 py-2 text-gray-800">{totalNumber || numberInStock}</span>
                <div className="item-card-info-icon">
                   <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 16">
                    <path fill="#141C2C" d="M3.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM3 5h-2v-1h2v1z"></path>
                    <path fill="#141C2C" d="M8.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM8 5h-2v-1h2v1z"></path>
                    <path fill="#141C2C" d="M11.954 2.773l-2.679 1.35c-0.246 0.124-0.345 0.426-0.222 0.671l4.5 8.93c0.124 0.246 0.426 0.345 0.671 0.222l2.679-1.35c0.246-0.124 0.345-0.426 0.222-0.671l-4.5-8.93c-0.124-0.246-0.426-0.345-0.671-0.222z"></path>
                    <path fill="#141C2C" d="M14.5 13.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z"></path>
                  </svg>
                  <span className="item-card-span">{itemType}</span>
                </div>
              </div>
              <div className="item-card-info">
                <span className="item-card-span">{itemCategory}</span>                {/* <div className="item-card-info-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill="#141C2C" d="M0 0h4v4h-4zM6 1h10v2h-10zM0 6h4v4h-4zM6 7h10v2h-10zM0 12h4v4h-4zM6 13h10v2h-10z"></path>
                  </svg>
                  <span className="item-card-span">{itemCategory}</span>
                </div> */}
              </div>

              <div className="item-card-description">
                {/* <p>{dateAdded}</p> */ authorView && 
                <p> {description}</p>
                }

              </div>
              <div className="item-card-back-top">
                <span className="item-card-back-top-isbn">ISBN </span><br/>
                <span>{isbn}</span>
              </div>
              {!authorView && <div className="item-card-back-edit" onClick={(e) => editItem(index)} onMouseEnter={(e) => setTooltipEdit(true)} onMouseLeave={(e) => setTooltipEdit(false)} style={{ backgroundImage: `url(/${images.edit_icon})` }}><span className={tooltipEdit ? `${tooltipClassName} show-tooltip` : tooltipClassName}>edit</span>
             </div>}


              <label className="item-return-button " aria-hidden="true" onClick={(e) => handleClick(e)}>
                {/* <span className="item-card-icon-span"> */}
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 16 16">
                  <path fill="#141C2C" d="M6.293 13.707l-5-5c-0.391-0.39-0.391-1.024 0-1.414l5-5c0.391-0.391 1.024-0.391 1.414 0s0.391 1.024 0 1.414l-3.293 3.293h9.586c0.552 0 1 0.448 1 1s-0.448 1-1 1h-9.586l3.293 3.293c0.195 0.195 0.293 0.451 0.293 0.707s-0.098 0.512-0.293 0.707c-0.391 0.391-1.024 0.391-1.414 0z"></path>
                </svg>
              </label>
            </div>
          </div>



        </div>
        </div>
    </div>
  );
}

 

/*
 {
                "itemId": 1,
                "title": "As You Like It 2",
                "isbn": "793-47092-2312-3387",
                "totalNumber": 3,
                "itemType": "books",
                "itemCategory": "Arts",
                "itemCode": "18283dce-1aff-3594-8c43-89db07d839b2",
                "author": "William Shakespeare",
                "dateAdded": "2019-06-16 14:51:07"
            }
*/
