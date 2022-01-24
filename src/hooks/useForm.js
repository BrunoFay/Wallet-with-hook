import { useState } from 'react';
/* hook só utilizado no login, com fins de experimento
 referencia https://joaopedro.dev/simplificando-formularios-com-hooks/ */
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