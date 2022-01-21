import React from 'react';

export default function Header() {
  const { userEmail, totalPrice } = this.props;
  const quote = (exp) => Number(Object.values(exp.exchangeRates)
    .filter((coin) => coin.code === exp.currency)
    .map((price) => price.ask)
    .reduce((acc) => acc));
  const total = totalPrice
    .map((item) => item.value * quote(item))
    .reduce((cur, acc) => acc + cur, 0);

  return (
    <header>
      <span data-testid="email-field">{userEmail}</span>
      <span data-testid="total-field">{total.toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  )
}