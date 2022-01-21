import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const useForm = ({ values, setValues }) => {
  const [buttonValidation, setButtonValidation] = useState(true);
  const navegate = useNavigate()
  const handleChange = ({ target }) => {
    const formData = { ...values };
    formData[target.name] = target.value;
    setValues(formData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    navegate('/wallet')
  };
  return [{ buttonValidation, setButtonValidation }, handleChange, handleSubmit];
};

export default useForm;