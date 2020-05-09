import React from 'react';

export default function Button(props) {
  const { textName, className } = props;
  return (
    <button className={className}>
      {textName}
    </button>
  );
}
