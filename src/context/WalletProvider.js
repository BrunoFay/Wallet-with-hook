import React, {useState } from 'react';
import walletContext from './wallet';
export default function WalletProvider({children}) {
  const [currencies, setCurrencies] = useState({})
  const [expenses, setExpenses] = useState([])
function newExpense(expense){
  setExpenses(expenses.concat(expense))
}
function removeExpense(id) {
  const newExpenses = [...expenses].filter((exp) => exp.id !== id);
  setExpenses(newExpenses)
}
  const contextValue = {
    currencies,
    expenses,
    setCurrencies,
    newExpense,
    removeExpense
  }
  return (
    <walletContext.Provider value={contextValue}>
      {children}
    </walletContext.Provider>
  )
}
