import React, { useContext } from 'react';
import userContext from '../context/user';
import walletContext from '../context/wallet';
export default function Header() {
  const { values: { email } } = useContext(userContext)
  const { expenses } = useContext(walletContext)

  const quote = (exp) => Number(Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.ask)
    .reduce((acc) => acc));
  const total = expenses
    .map((item) => item.value * quote(item))
    .reduce((cur, acc) => acc + cur, 0);

  return (
    <header>
      <span>{email}</span>
      <span>{total.toFixed(2)} <span>R$</span></span>
     
    </header>
  )
}
