import React, { useContext, useEffect } from 'react';
import walletContext from '../context/wallet';

export default function ExpenseTable() {
  const {
    expenses,
    removeExpense,
    editExpense,
    editForm,
    setExpenses } = useContext(walletContext)
  
    useEffect(() => {
    const localStorageValidation = localStorage.getItem('expenses') === null
    if (expenses.length === 0 && !localStorageValidation){
      const expensesLocalStorage =  JSON.parse(localStorage.getItem('expenses'))
      setExpenses(expensesLocalStorage)
    }
  },[expenses.length,setExpenses]);

  const quote = (exp) => Number(Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.ask)
    .reduce((acc) => acc));
  const coinName = (exp) => Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.name)[0]
    .replace('/Real Brasileiro', '');

  return <table border='1'>
    <thead   >
      <tr >
        <th>Valor</th>
        <th>Tag</th>
        <th>Descrição</th>
        <th>Método de pagamento</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((exp) => (

        <tr key={exp.id} >
          <td>{exp.value}</td>
          <td id={exp.tag}>{exp.tag}</td>
          <td>{exp.description}</td>
          <td id={`${exp.method}`} className='method'>{exp.method}</td>
          <td>
            {coinName(exp) === 'Dólar Americano'
              ? 'Dólar Comercial' : coinName(exp)}
          </td>
          <td>{quote(exp).toFixed(2)}</td>

          <td>{(quote(exp) * exp.value).toFixed(2)}</td>
          <td>
            <button
              type="button"
              onClick={() => editExpense(exp)}
              disabled={editForm}
              id='button-edit'
            >
              Editar
            </button>
            <button
              onClick={() => removeExpense(exp.id)}
              type="button"
              id='button-rmv'
            >
              Excluir
            </button>
          </td>

        </tr>
      ))}
    </tbody>

  </table>
}
