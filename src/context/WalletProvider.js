import React, {useState } from 'react';
import walletContext from './wallet';
export default function WalletProvider({children}) {
  const [currencies, setCurrencies] = useState({})
  const [expenses, setExpenses] = useState([])
function nexExpense(expense){
  setExpenses(expenses.concat(expense))
}
  const contextValue = {
    currencies,
    expenses,
    setCurrencies,
    nexExpense
  }
  return (
    <walletContext.Provider value={contextValue}>
      {children}
    </walletContext.Provider>
  )
}
