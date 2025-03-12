import { useState } from 'react';

import { ColorField, useInputForm } from '@/shared';

export const useProjectForm = () => {
  const {
    value: projectName,
    handleChange: handleNameChange,
    setValue: setProjectName,
  } = useInputForm();

  const [projectColor, setProjectColor] = useState<ColorField>(null);

  const handleChangeColor = (color: ColorField) => {
    setProjectColor(color);
  };

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
