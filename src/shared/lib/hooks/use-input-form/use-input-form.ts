import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const useInputForm = (initValue = '') => {
  const [value, setValue] = useState(initValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return {
    value,
    handleChange,
    setValue,
  };
};
