import React, { useContext } from 'react';
import userContext from '../context/user';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseForm';
;

export default function Wallet() {


  return <>
   
    <Header />
    <ExpenseForm />
    <ExpenseTable />
  </>;
}
