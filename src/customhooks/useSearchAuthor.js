import React, { useState } from 'react';

const useSearchAuthor = (callback) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    return  callback();
  }
  
  const handleInputChange = (event) => {
    event.persist();
    setInput(event.target.value);
  }

  return { handleSubmit, handleInputChange, input };
}
export default useSearchAuthor;
