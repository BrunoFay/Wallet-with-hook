import { useState } from 'react';
const useForm = ({ values, setValues }) => {
  const [buttonValidation, setButtonValidation] = useState(true);
  const handleChange = ({ target }) => {
    const formData = { ...values };
    formData[target.name] = target.value;
    setValues(formData);
  };

  return [{ buttonValidation, setButtonValidation }, handleChange];
};

export default useForm;