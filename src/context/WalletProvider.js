import React, {useState } from 'react';
import walletContext from './wallet';
export default function WalletProvider(children) {
  const [currencies, setCurrencies] = useState({})
  const [expenses, setExpenses] = useState([])

  const contextValue = {
    currencies,
    expenses,
    setCurrencies,
    setExpenses
  }
  return (
    <walletContext.Provider value={contextValue}>
      {children}
    </walletContext.Provider>
  )
}
