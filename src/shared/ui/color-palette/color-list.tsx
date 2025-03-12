import { memo } from 'react';

import { PALETTE_COLORS } from '@/shared/constants';

import { ColorField } from './color-palette';

export const ColorList = memo(
  ({ onChangeColor }: { onChangeColor?: (color: ColorField) => void }) => {
    return (
      <>
        {PALETTE_COLORS.map((color) => (
          <div
            onClick={() => {
              onChangeColor?.(color);
            }}
            className={`size-8 cursor-pointer rounded border border-gray-300 transition-transform hover:scale-110`}
            style={{ backgroundColor: color.hex }}
            key={color.hex}
          />
        ))}
      </>
    );
  }
);
ColorList.displayName = 'ColorList';
