import React, { useContext } from 'react';
import userContext from '../context/user';
import walletContext from '../context/wallet';
import { GiWallet } from 'react-icons/gi';
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
      <div>
        <GiWallet/>
        <span>Wallet</span>
      </div>
        <span id='email-header'>{email}</span>
        <span id='total'>{total.toFixed(2)} <span>R$</span></span>
    </header>
  )
}
