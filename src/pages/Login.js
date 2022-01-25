import React, { useContext, useEffect } from 'react';
import useForm from '../hooks/useForm';
import userContext from '../context/user';
import { useNavigate } from "react-router-dom";
import { GiWallet } from 'react-icons/gi';


export default function Login() {
  const context = useContext(userContext)
  const { values: { senha, email }, setValues } = useContext(userContext)
  const [{ buttonValidation, setButtonValidation }, handleChange] = useForm(context)
  const navegate = useNavigate()

  useEffect(() => {
    senha && emailValidation()
  }, [senha, email]);

  function handleSubmit(e) {
    e.preventDefault();
    navegate('/wallet')
  };

  function emailValidation() {
    const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (REGEX_EMAIL.test(email) && senha.length > 4) {
      setValues({ email })
      return setButtonValidation(false);
    }
    return setButtonValidation(true);
  }

  return <main className='login-pag'>
    <form>
      <span>Wallet<span id='login-icon'> <GiWallet /></span></span>
      <input
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        name="senha"
        type="password"
        onChange={handleChange}
        placeholder="senha"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={buttonValidation}
      >
        Entrar
      </button>
    </form>
    <span id='login-message'>made jan 2022 by Bruno Fay</span>
  </main>;
}
