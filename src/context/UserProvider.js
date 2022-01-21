
import React, { useState } from 'react';
import userContext from './user';

function UserProvider({ children }) {
  const [values, setValues] = useState({email:'',senha:''});

  const contextValue = {
    values,
    setValues,
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;