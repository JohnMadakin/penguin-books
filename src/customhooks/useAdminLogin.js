import React, { useState } from 'react';

const useAdminLogin = (callback) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    return callback();
  }

  const handleEmailChange = (event) => {
    event.persist();

    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    event.persist();

    setPassword(event.target.value);
  }

  return { handleSubmit, handleEmailChange, handlePasswordChange, userDetails:{ email, password } };
}
export default useAdminLogin;
