import { useEffect, useState } from 'react';

import { ColorField } from '@/shared';

export const useEditForm = (color: ColorField | undefined, name: string) => {
  const [projectName, setProjectName] = useState(name);

  const [projectColor, setProjectColor] = useState<ColorField>(color ?? null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleChangeColor = (color: ColorField) => {
    setProjectColor(color);
  };

  useEffect(() => {
    if (name) {
      setProjectName(name);
      setProjectColor(color ?? null);
    }
  }, [color, name]);

  return {
    state: { projectName, projectColor },

    fn: {
      handleInputChange,
      handleChangeColor,
    },
  };
};
