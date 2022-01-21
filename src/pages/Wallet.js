import React, { useContext } from 'react';
import userContext from '../context/user';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseForm';
;

export default function Wallet() {
  const { values: { email } } = useContext(userContext)
  console.log(email)

  return <>
    <h4>{email}</h4>
    <Header />
    <ExpenseForm />
    <ExpenseTable />
  </>;
}
