import React, { useContext } from 'react';
import userContext from '../context/user';
export default function Wallet() {
  const {values:{email}}= useContext(userContext)
  console.log(email)

  return <div>
    <h1>wallet</h1>
    <h4>{email}</h4>
  </div>;
}
