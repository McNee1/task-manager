import { useState } from 'react';

import { ColorField } from '@/shared';

export const useProjectForm = () => {
  const [projectName, setProjectName] = useState('');

  const [projectColor, setProjectColor] = useState<ColorField>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleChangeColor = (color: ColorField) => {
    setProjectColor(color);
  };

  return {
    state: {
      projectName,
      projectColor,
    },
    fn: {
      handleInputChange,
      handleChangeColor,
      setProjectName,
    },
  };
};
