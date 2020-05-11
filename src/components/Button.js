import React from 'react';

export default function Button(props) {
  const { textName, className, handleSubmit } = props;
  return (
    <button className={className} onClick={handleSubmit}>
      {textName}
    </button>
  );
}
