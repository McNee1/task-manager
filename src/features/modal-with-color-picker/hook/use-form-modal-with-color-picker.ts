import { useCallback, useState } from 'react';

import { ColorField, useInputForm } from '@/shared';

export const useModalWithColorPicker = (
  initName?: string,
  initColor: ColorField = null
) => {
  const {
    value: projectName,
    handleChange: handleNameChange,
    setValue: setProjectName,
  } = useInputForm(initName);

  const [projectColor, setProjectColor] = useState<ColorField>(initColor);

  const handleChangeColor = useCallback((color: ColorField) => {
    setProjectColor(color);
  }, []);

  return {
    state: {
      projectName,
      projectColor,
    },
    fn: {
      handleNameChange,
      handleChangeColor,
      setProjectName,
    },
  };
};
