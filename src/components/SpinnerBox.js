import React from 'react';
import '../assets/styles/spinnerBox.css';

export default function Spinner({ height, width, customClass }) {
  const boxHeight = !!height ? height : '1em';
  const boxWidth = !!width ? width : '2em';

  return (
    <div className={customClass ? `spinner-box mb-6  ${customClass}` : "spinner-box mb-6"} style={{ width: boxWidth }}>
      <span className="spinner-rec" style={{ height: boxHeight }}></span>
      <span className="spinner-rec" style={{ height: boxHeight }}></span>
      <span className="spinner-rec" style={{ height: boxHeight }}></span>
      <span className="spinner-rec" style={{ height: boxHeight }}></span>
    </div>  
  );
}
