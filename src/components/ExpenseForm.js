import React, { useContext, useEffect, useState } from 'react';
import walletContext from '../context/wallet';
import fetchData from '../service/api'
const INITIAL_EXPENSE_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: [],
}
export default function ExpenseForm() {
  const [currencie, setCurrencie] = useState({})
  const [expense, setExpense] = useState(INITIAL_EXPENSE_STATE)
  const { setCurrencies, newExpense, expenses } = useContext(walletContext)

  useEffect(() => {
    /* fazer isso para utilizar requisição a api, função nao pode ser assincrona */
    fetchData().then(data => setCurrencie(data));
  }, []);

  function handleChange({ target }) {
    const expenseState = { ...expense, exchangeRates: currencie };
    expenseState[target.name] = target.value;
    setExpense(expenseState);
  };
  function handleClick(e) {
    e.preventDefault();
    setCurrencies(currencie)
    newExpense(expense)

    console.log(expenses);
  }
  const currenciesFiltred = Object.values(currencie)
    .filter((item) => item.codein !== 'BRLT' && item.code !== 'DOGE')
    .reduce((item, acc) => ({ ...item, [acc.code]: acc }), {});

  const { value, description, currency, method, tag } = expense
  return (
    <form>
      <input
        type="number"
        name="value"
        value={value}
        placeholder="valor"
        onChange={(e) => handleChange(e)}
        data-testid="value-input"
      />
      <input
        name="description"
        value={description}
        placeholder="descrição"
        onChange={(e) => handleChange(e)}
        data-testid="description-input"
      />
      <label htmlFor="moeda">
        Moedas
        <select
          name="currency"
          value={currency}
          onChange={(e) => handleChange(e)}
          data-testid="currency-input"
          id="moeda"
        >
          {Object.keys(currenciesFiltred)
            .map((coin, index) => (
              <option data-testid={`${coin}`} key={index}>
                {' '}
                {coin}
              </option>))}
        </select>
      </label>
      <select
        name="method"
        value={method}
        onChange={(e) => handleChange(e)}
        data-testid="method-input"
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
      <select
        name="tag"
        value={tag}
        onChange={(e) => handleChange(e)}
        data-testid="tag-input"
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
        Adicionar despesa
      </button>
    </form>
  );
}
