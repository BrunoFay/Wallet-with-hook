import React, { useContext, useState } from 'react';
import walletContext from '../context/wallet';
const INITIAL_EXPENSE_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
}
export default function EditExpenseForm() {
  const {
    editExpenses,
    currencies,
    newExpense,
    setEditform,
    currenciesFiltred } = useContext(walletContext)
  const [editedEXpense, setEditedExpense] = useState(editExpenses[0])
  const {
    value,
    description,
    currency,
    method,
    tag,
    id } = editedEXpense
  function handleChange({ target }) {
    let expenseState = { ...editedEXpense, exchangeRates: currencies, id };
    expenseState[target.name] = target.value;
    setEditedExpense(expenseState);
  };
  function handleClick(e) {
    e.preventDefault();
    newExpense(editedEXpense)
    setEditedExpense(INITIAL_EXPENSE_STATE)
    setEditform()
  }
  return (
    <form className='form-expenses' id='form-edit'>
       <label htmlFor='value'>Valor :</label>
      <input
        type="number"
        name="value"
        value={Number(value)}
        placeholder="valor"
        onChange={(e) => handleChange(e)}
      />
       <label htmlFor='value'>Descrição :</label>
      <input
        name="description"
        value={description}
        placeholder="descrição"
        onChange={handleChange}
      />
      <label htmlFor="moeda">
        Moedas
        <select
          name="currency"
          value={currency}
          onChange={(e) => handleChange(e)}
          id="moeda"
        >
          {Object.keys(currenciesFiltred)
            .map((coin, index) => (
              <option key={index}>
                {' '}
                {coin}
              </option>))}
        </select>
      </label>
      <label htmlFor='value'>Forma de pagamento :</label>
      <select
        name="method"
        value={method}
        onChange={(e) => handleChange(e)}

      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
      <label htmlFor='value'>Categoria :</label>
      <select
        name="tag"
        value={tag}
        onChange={(e) => handleChange(e)}

      >
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
      <button
        type="submit"
        onClick={(e) => handleClick(e)}
      >
        Editar
      </button>
    </form>
  )
}
