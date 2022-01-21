import React from 'react';

export default function ExpenseForm() {
  return (
    <form>
      <input
        type="number"
        name="value"
        value={ value }
        placeholder="valor"
        onChange={ (e) => this.handleChange(e) }
        data-testid="value-input"
      />
      <input
        name="description"
        value={ description }
        placeholder="descrição"
        onChange={ (e) => this.handleChange(e) }
        data-testid="description-input"
      />
      <label htmlFor="moeda">
        Moedas
        <select
          name="currency"
          value={ currency }
          onChange={ (e) => this.handleChange(e) }
          data-testid="currency-input"
          id="moeda"
        >
          {Object.keys(ResponseFiltred)
            .map((coin, index) => (
              <option data-testid={ `${coin}` } key={ index }>
                {' '}
                {coin}
              </option>))}
        </select>
      </label>
      <select
        name="method"
        value={ method }
        onChange={ (e) => this.handleChange(e) }
        data-testid="method-input"
      >
        <option>Dinheiro</option>
        <option>Cartão de crédito</option>
        <option>Cartão de débito</option>
      </select>
      <select
        name="tag"
        value={ tag }
        onChange={ (e) => this.handleChange(e) }
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
        onClick={ (e) => this.setStateToRedux(e) }
      >
        Adicionar despesa
      </button>
    </form>
  );  
}
