import React, { useState } from 'react';

import '../assets/styles/item.css';
import images from '../assets/images';

export default function Item(props) {
  const { containerClassName, item } = props;
  const [flipCard, setFlipCard] = useState(false);
  const [activeRow, setActiveRow] = useState(false);

  const { title, isbn, totalNumber, itemType, itemCategory, itemCode, author, dateAdded } = item;

  const contentStyle = 'item-card-content  w-full h-full';
  const addressStyle = 'item-list-address-content p-5 h-32';
  const rowStyle = 'item-list-row flex flex-col justify-between xl:w-5/12 ';


  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function handleClick(e) {
    setFlipCard(!flipCard);
    setActiveRow(!activeRow);
  }
//
  let g = getRandomNumber(6)
  console.log('-------out of love ----------',g, images.items_backgrounds[g])
  // divide-x-2 divide-gray-400
  return (
    <div className={`item-card-container h-48  xl:w-64 m-2  shadow ${containerClassName}`}>
      <div className="item-card w-full h-full">
        {/* <input type="checkbox" id="card1" className="more" aria-hidden="true"/> */}
        <div className={flipCard ? `${contentStyle} flip-card` : `${contentStyle}`}>
          <div className="item-card-front  w-full h-full" style={{ backgroundImage: `url(/${images.items_backgrounds[g]})` }} >
            <div className="item-card-inner">
              <h2 className="item-card-title">Harry Potter And the Prisoner of Azkaban</h2>
              <label htmlFor="card1" className="item-card-button" aria-hidden="true" onClick={(e) => handleClick(e)} >
                Details
                </label>
            </div>

          </div>

          {/**------------------------- card back -------------------------------------- */}
          <div className="item-card-back w-full h-full">
            <div className="item-card-back-inner">
              <div className="item-card-info">
                <span>5</span>
                <div className="item-card-info-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
                    <path fill="#000000" d="M3.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM3 5h-2v-1h2v1z"></path>
                    <path fill="#000000" d="M8.5 2h-3c-0.275 0-0.5 0.225-0.5 0.5v11c0 0.275 0.225 0.5 0.5 0.5h3c0.275 0 0.5-0.225 0.5-0.5v-11c0-0.275-0.225-0.5-0.5-0.5zM8 5h-2v-1h2v1z"></path>
                    <path fill="#000000" d="M11.954 2.773l-2.679 1.35c-0.246 0.124-0.345 0.426-0.222 0.671l4.5 8.93c0.124 0.246 0.426 0.345 0.671 0.222l2.679-1.35c0.246-0.124 0.345-0.426 0.222-0.671l-4.5-8.93c-0.124-0.246-0.426-0.345-0.671-0.222z"></path>
                    <path fill="#000000" d="M14.5 13.5c0 0.276-0.224 0.5-0.5 0.5s-0.5-0.224-0.5-0.5c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5z"></path>
                  </svg>
                  <span className="item-card-span">type</span>
                </div>
              </div>
              <div className="item-card-info">
                <span>5</span>
                <div className="item-card-info-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path fill="#000000" d="M0 0h4v4h-4zM6 1h10v2h-10zM0 6h4v4h-4zM6 7h10v2h-10zM0 12h4v4h-4zM6 13h10v2h-10z"></path>
                  </svg>
                  <span className="item-card-span">category</span>
                </div>
              </div>

              <div className="item-card-description">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, accusamus.</p>

              </div>
              <div class="item-card-back-top">Warsaw, Poland</div>
              <div class="item-card-back-top2">38€ / day</div>
              <label className="item-return-button " aria-hidden="true" onClick={(e) => handleClick(e)}>
                {/* <span className="item-card-icon-span"> */}
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000000" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.222 18.917c5.666-5.905-.629-10.828-5.011-7.706l1.789 1.789h-6v-6l1.832 1.832c7.846-6.07 16.212 4.479 7.39 10.085z" /></svg>
                {/* </span> */}

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

      {/* <div className={activeRow ? `${rowStyle} active border-t-0` : `${rowStyle}`} onClick={handleClick}>
        <div className="item-list-row-item text-2xl  mb-2 w-48 h-24 text-white">{title ? title : ''}</div>

        <div className="flex flex-row justify-between">
          <div className="item-list-row-item item-tag mb-2 mr-5 " >{itemType ? itemType : ''}</div>
          <div className="item-list-row-item item-tag mb-2 bg-gray-500 ">{itemCategory ? itemCategory : ''}</div>
        </div>
        <div className="w-48 text-white">
          Author: {author}
        </div>
      </div> */}
