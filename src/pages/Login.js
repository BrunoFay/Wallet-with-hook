import React, { useContext,useEffect } from 'react';
import useForm from '../hooks/useForm';
import userContext from '../context/user';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const context = useContext(userContext)
  const { values: { senha, email }, setValues } = useContext(userContext)
  const [ { buttonValidation, setButtonValidation }, handleChange] = useForm(context)
  const navegate = useNavigate()

  useEffect(() => {
    setValues({ email })
    senha && validation()
  }, [senha, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navegate('/wallet')
  };

  const validation = () => {
    const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (REGEX_EMAIL.test(email) && senha.length > 4) {
      return setButtonValidation(false);
    }
    return setButtonValidation(true);
  }
  return <main className='login-pag'>
    <div>testando</div>
    <form>
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
  </main>;
}
