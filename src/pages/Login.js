import React, { useContext } from 'react';
import useForm from '../hooks/useForm';
import userContext from '../context/user';
import { useEffect } from 'react';
export default function Login() {
  const context = useContext(userContext)
  const { values: { senha, email }, setValues } = useContext(userContext)
  console.log(context);
  const [
    { buttonValidation, setButtonValidation },
    handleChange, handleSubmit
  ] = useForm(context)
  useEffect(() => {
    setValues({ email, senha })
    senha && validation()
  }, [senha, email]);

  const validation = () => {
    const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (REGEX_EMAIL.test(email) && senha.length > 4) {
      return setButtonValidation(false);
    }
    return setButtonValidation(true);
  }
  return <>
    <div>testando</div>
    <form>
      <input
        name="email"
        placeholder="email"
        onChange={handleChange}
        data-testid="email-input"
      />
      <input
        name="senha"
        type="password"
        data-testid="password-input"
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
  </>;
}
