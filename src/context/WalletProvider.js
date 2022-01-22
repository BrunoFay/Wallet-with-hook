import React, { useState } from 'react';
import walletContext from './wallet';
export default function WalletProvider({ children }) {
  const [currencies, setCurrencies] = useState({})
  const[currenciesFiltred,setCurrenciesFiltred]=useState()
  const [expenses, setExpenses] = useState([])
  const [editExpenses, setEditExpenses] = useState({})
  const [editForm, setEditform] = useState(false)
  
  function newExpense(expense) {
    setExpenses(expenses.concat(expense))
  }
  function removeExpense(id) {
    const newExpenses = [...expenses].filter((exp) => exp.id !== id);
    setExpenses(newExpenses)
  }

  function editExpense(test) {
    const editedExpenses = [...expenses].filter((exp) => exp.id === test.id);
    removeExpense(test.id)
    setEditExpenses(editedExpenses)
    setEditform(!editForm)

  }
  const contextValue = {
    currencies,
    expenses,
    setCurrencies,
    newExpense,
    removeExpense,
    editExpense,
    editExpenses,
    editForm,
    setEditform,
    currenciesFiltred,
    setCurrenciesFiltred,
  }
  return (
    <walletContext.Provider value={contextValue}>
      {children}
    </walletContext.Provider>
  )
}
