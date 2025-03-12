import { X } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';

import { ColorList } from './color-list';

export interface ColorPaletteProps {
  onColorChange?: (color: ColorField) => void;
  onResetColor?: VoidFunction;
}

export type ColorField = {
  hex: string;
  name: string;
} | null;

const ColorPalette = ({ onColorChange, onResetColor }: ColorPaletteProps) => {
  const [, setColor] = useState<ColorField>(null);

  const resetColor = () => {
    setColor(null);
  };

  const colorChangeHandler = useCallback(
    (color: ColorField) => {
      setColor(color);
      onColorChange?.(color);
    },
    [onColorChange]
  );

  const resetColorHandler = useCallback(() => {
    resetColor();
    onResetColor?.();
  }, [onResetColor]);

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2 grid grid-cols-5 gap-1'>
        <ColorList onChangeColor={colorChangeHandler} />
      </div>

      <Button
        className='h-fit w-full gap-x-3 py-2 font-normal'
        onClick={resetColorHandler}
        variant={'ghost'}
      >
        <X />
        Сбросить цвет
      </Button>
    </div>
  );
};
export default ColorPalette;
