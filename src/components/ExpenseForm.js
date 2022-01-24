import React, { useContext, useEffect, useState } from 'react';
import walletContext from '../context/wallet';
import useForm from '../hooks/useForm';
import fetchData from '../service/api'
import { FaBars } from 'react-icons/fa';

const INITIAL_EXPENSE_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: [],
}

/* referencia https://codigofonte.org/gerando-id-aleatorio-em-javascript/ */
const ID_GENERATE = () => Math.floor(Date.now() * Math.random()).toString(36)

export default function ExpenseForm() {
 
  const [currencie, setCurrencie] = useState({})
  const [expense, setExpense] = useState(INITIAL_EXPENSE_STATE)
  const { setCurrencies, newExpense, setCurrenciesFiltred } = useContext(walletContext)
  const { value, description, currency, method, tag } = expense
  const [{ buttonValidation, setButtonValidation }] = useForm(walletContext)
  const [navBar, setNavBar] = useState('')
  const [navBarClicked, setNavBarClicked] = useState(false)
  useEffect(() => {
    if (navBar === 'visible') {
      document.body.classList.toggle('navbar-open')
      document.body.style.backgroundColor = "red";
    }
    else {
      document.body.classList.remove('navbar-open')
    }
  }, [navBar])

  useEffect(() => {
    if (navBarClicked) {
      document.body.style.backgroundColor = "initial";
    }
    else {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.548)";

    }
  }, [navBarClicked])
  useEffect(() => {
    /* fazer isso para utilizar requisição a api, componente funcional nao pode ser assincrona */
    fetchData().then(data => setCurrencie(data));
  }, []);

  useEffect(() => {
    setCurrenciesFiltred(currenciesFiltred)
  }, [currencie]);

  useEffect(() => {
    value > '0' ? setButtonValidation(false) : setButtonValidation(true)
  }, [value])

  const currenciesFiltred = Object.values(currencie)
    .filter((item) => item.codein !== 'BRLT' && item.code !== 'DOGE')
    .reduce((item, acc) => ({ ...item, [acc.code]: acc }), {});

  function handleChange({ target }) {
    const expenseState = { ...expense, exchangeRates: currencie, id: ID_GENERATE() };
    expenseState[target.name] = target.value;
    setExpense(expenseState);
  };
  function handleNavBar() {
    setNavBarClicked(!navBarClicked)
    navBarClicked ? setNavBar('flex') : setNavBar('none')
  }
  function handleClick(e) {
    e.preventDefault();
    setCurrencies(currencie)
    newExpense(expense)
    setExpense(INITIAL_EXPENSE_STATE)
    setButtonValidation()
  };

  return (<>
    <div className='nav-icon' > <FaBars onClick={() => handleNavBar()} /></div>
    <form 
    className='form-expenses'
    style={{ display: `${navBar}`}}>
      <span className='despesa-span'>Despesa</span>
      <label htmlFor='value'>Valor :</label>
      <input
        id='value'
        type="number"
        name="value"
        value={value}
        placeholder="Ex: 100"
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor='description'>Descrição :</label>
      <input
        id='description'
        name="description"
        value={description}
        placeholder="Ex: pizza"
        onChange={(e) => handleChange(e)}
      />

      <label htmlFor='method'>Forma de pagamento :</label>
      <select
        id='method'
        name="method"
        value={method}
        onChange={(e) => handleChange(e)}
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
      <label htmlFor='tag'>Categoria :</label>

      <select
        id='tag'
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
      <label htmlFor="moeda">
        Moedas :
      </label>
      <select
        name="currency"
        value={currency}
        onChange={(e) => handleChange(e)}
        id="moeda"
      >
        {Object.keys(currenciesFiltred)
          .map((coin, index) => (
            <option key={index}>
              {coin}
            </option>))}
      </select>
      <button
        type="submit"
        onClick={(e) => handleClick(e)}
        disabled={buttonValidation}
        className='button-form'
      >
        Adicionar
      </button>
    </form>
  </>

  );
}
