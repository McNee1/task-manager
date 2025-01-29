import { X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

const COLORS = [
  { hex: '#FF9999', name: 'Светло-красный' },
  { hex: '#FFCC66', name: 'Светло-оранжевый' },
  { hex: '#ADD8E6', name: 'Светло-голубой' },
  { hex: '#B3FF99', name: 'Светло-зеленый' },
  { hex: '#99FF99', name: 'Светло-зеленый' },
  { hex: '#99FFFF', name: 'Светло-бирюзовый' },
  { hex: '#66B3FF', name: 'Светло-синий' },
  { hex: '#9999FF', name: 'Светло-синий' },
  { hex: '#D9A6FF', name: 'Светло-фиолетовый' },
  { hex: '#FF99FF', name: 'Светло-магента' },
  { hex: '#FF66B3', name: 'Светло-розовый' },
  { hex: '#FFFFFF', name: 'Белый' },
  { hex: '#E0E0E0', name: 'Светло-серый' },
  { hex: '#D9D9D9', name: 'Серый' },
  { hex: '#B3B3B3', name: 'Темно-серый' },
  { hex: '#CCCCCC', name: 'Светло-серый' },
  { hex: '#E6B3B3', name: 'Светло-коричневый' },
  { hex: '#FFD700', name: 'Золотой' },
  { hex: '#FFCC99', name: 'Светло-оранжево-красный' },
  { hex: '#D2FFB2', name: 'Светло-зеленый лайм' },
  { hex: '#D1C6E7', name: 'Светло-синий фиолетовый' },
];

interface ColorPaletteProps {
  onColorChange?: (color: ColorField) => void;
  onResetColor?: VoidFunction;
}

export type ColorField = {
  hex: string;
  name: string;
} | null;

export const ColorPalette = ({ onColorChange, onResetColor }: ColorPaletteProps) => {
  const [, setColor] = useState<ColorField>(null);

  const resetColor = () => {
    setColor(null);
  };

  const colorChangeHandler = (color: ColorField) => {
    setColor(color);
    onColorChange?.(color);
  };

  const resetColorHandler = () => {
    resetColor();
    onResetColor?.();
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2 grid grid-cols-5 gap-1'>
        {COLORS.map((color) => (
          <div
            onClick={() => {
              colorChangeHandler(color);
            }}
            className={`size-8 cursor-pointer rounded border border-gray-300 transition-transform hover:scale-110`}
            style={{ backgroundColor: color.hex }}
            key={color.hex}
          />
        ))}
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
