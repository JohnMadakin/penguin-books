import React from 'react';
import '../assets/styles/spinner.css';

export default function Spinner() {
  return (
    <div className="loader mb-6" >
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>  
  );
}
