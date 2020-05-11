import React from 'react';

export default function Input(props) {
  const { className, type, placeholder, handleChange } = props;
  return (
    <input className={className} type={type} placeholder={placeholder} onChange={handleChange}/>
  );
}
