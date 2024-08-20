import { useState, ChangeEvent } from 'react';

type FormValues = Record<string, string>;

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof T, value: T[keyof T]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues(initialValues);
  };

  return {
    formValues,
    handleChange,
    handleSelectChange,
    resetForm,
  };
};
