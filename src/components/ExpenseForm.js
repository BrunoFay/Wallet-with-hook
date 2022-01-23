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
  const [navBar,setNavBar] =useState('hidden')
  const [navBarClicked,setNavBarClicked] = useState(false)
 
  
  useEffect(() => {
    /* fazer isso para utilizar requisição a api, componente funcional nao pode ser assincrona */
    fetchData().then(data => setCurrencie(data));
  }, []);

  useEffect(() => {
    setCurrenciesFiltred(currenciesFiltred)
  }, [currencie]);

  useEffect(() => {
     value > '0' ? setButtonValidation(false):setButtonValidation(true)
  }, [value])

  const currenciesFiltred = Object.values(currencie)
    .filter((item) => item.codein !== 'BRLT' && item.code !== 'DOGE')
    .reduce((item, acc) => ({ ...item, [acc.code]: acc }), {});

  function handleChange({ target }) {
    const expenseState = { ...expense, exchangeRates: currencie, id: ID_GENERATE() };
    expenseState[target.name] = target.value;
    setExpense(expenseState);
  };
function handleNavBar(){
  setNavBarClicked(!navBarClicked)
  navBarClicked?setNavBar('visible'):setNavBar('hidden')
}
  function handleClick(e) {
    e.preventDefault();
    setCurrencies(currencie)
    newExpense(expense)
    setExpense(INITIAL_EXPENSE_STATE)
    setButtonValidation()
  };

  return (<>   
     <div className='nav-icon' onClick={()=>handleNavBar()}> <FaBars/></div>
   <form className='form-expenses' style={{visibility:`${navBar}`}}>
      <input
        type="number"
        name="value"
        value={value}
        placeholder="valor"
        onChange={(e) => handleChange(e)}
      />
      <input
        name="description"
        value={description}
        placeholder="descrição"
        onChange={(e) => handleChange(e)}
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
                {coin}
              </option>))}
        </select>
      </label>
      <select
        name="method"
        value={method}
        onChange={(e) => handleChange(e)}
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
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
        disabled={buttonValidation}
      >
        Adicionar despesa
      </button>
    </form>
    </>

  );
}
