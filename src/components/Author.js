import React from 'react';
import '../assets/styles/author.css';


export default function Author(props) {
  const { author } = props;
  const initials = getInitials(author.name);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  function getInitials(textname){
    let splitName = textname.split(' ');
    // console.log({splitName})
    return splitName.length > 1 ? splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase() : splitName[0].charAt(0).toUpperCase();
  }

  return (
    // <div className="w-64">
      <div className="authors-item flex flex-wrap flex-row mx-3 mb-6 p-3 w-64" >
        <div className="author-initials" style={{ color: '#' + randomColor }}>{initials}</div>
        <div className="author-label">
          {author.name}
        </div>
      </div>
    // </div>
  );
}
