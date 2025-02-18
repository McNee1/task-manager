import { ChangeEvent, useCallback, useState } from 'react';

export const useInputForm = (initValue = '') => {
  const [name, setName] = useState(initValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return {
    name,
    handleChange,
    setName,
  };
};
