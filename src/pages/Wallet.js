import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable ';
import EditExpenseForm from '../components/EditExpenseForm';
import walletContext from '../context/wallet';
import userContext from '../context/user';
import { useNavigate } from "react-router-dom";
export default function Wallet() {
  const { editForm } = useContext(walletContext)
  const { values: { email } } = useContext(userContext)
  const navegate = useNavigate()
  useEffect(() => {
    !email && navegate('/')
  }, []);

  return <>

    <Header />
    {
      editForm ? <EditExpenseForm /> : <ExpenseForm />
    }
    <ExpenseTable />
  </>;
}
