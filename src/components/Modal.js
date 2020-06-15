import React from 'react';
import '../assets/styles/modal.css';

export default function Modal(props) {
  const { animationClass, handleCloseModal } = props;
  const modalCss = 'w-5/12 xl:w-4/12 sm:w-auto md:w-9/12 sm:p-1';

  return (
    <div className="modal-container z-20"  >
      <div className="modal-background" data-close="close" onClick={handleCloseModal}>
        <div className={animationClass ? `${animationClass} modal ${modalCss}` : `modal ${modalCss}` }>
          {props.children}
          {/* <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
            <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
          </svg> */}
        </div>
      </div>
    </div>
  );
}
