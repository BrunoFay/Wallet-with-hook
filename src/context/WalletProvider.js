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
    addLocalStorage('expenses',expenses.concat(expense))
  }
  function removeExpense(id) {
    const newExpenses = [...expenses].filter((exp) => exp.id !== id);
    setExpenses(newExpenses)
    addLocalStorage('expenses',newExpenses)
  
  }

  function editExpense(test) {
    const editedExpenses = [...expenses].filter((exp) => exp.id === test.id);
    addLocalStorage('expenses',editedExpenses) 
    removeExpense(test.id)
    setEditExpenses(editedExpenses)
    setEditform(!editForm)
  }
  function addLocalStorage(key, value)  {
 localStorage.setItem(key, JSON.stringify(value));
  };

  
  
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
    addLocalStorage,
    setExpenses
  }
  return (
    <walletContext.Provider value={contextValue}>
      {children}
    </walletContext.Provider>
  )
}
