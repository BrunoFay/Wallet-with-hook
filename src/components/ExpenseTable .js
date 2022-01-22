import React,{useContext} from 'react';
import walletContext from '../context/wallet';

export default function ExpenseTable() {
  const {expenses,removeExpense,editExpense}=useContext(walletContext)
  
  const quote = (exp) => Number(Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.ask)
    .reduce((acc) => acc));
  const coinName = (exp) => Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.name)[0]
    .replace('/Real Brasileiro', '');

  return <table border="1">
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((exp) => (

        <tr key={exp.id}>
          <td>{exp.description}</td>
          <td>{exp.tag}</td>
          <td>{exp.method}</td>
          <td>{exp.value}</td>
          <td>
            {coinName(exp) === 'Dólar Americano'
              ? 'Dólar Comercial' : coinName(exp)}
          </td>
          <td>{quote(exp).toFixed(2)}</td>

          <td>{(quote(exp) * exp.value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button  
              type="button"
              onClick={() => editExpense(exp)}
            >
              Editar despesa
            </button>
            <button
              onClick={() => removeExpense(exp.id)}
              type="button"
            >
              excluir
            </button>
          </td>

        </tr>
      ))}
    </tbody>

  </table>
}
