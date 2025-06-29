import { lazy, Suspense } from 'react';

import { Lead } from '../../shadcn';
import { ColorPaletteProps } from './color-palette';

const LazyColorPalette = lazy(() => import('./color-palette'));

export const ColorPaletteSuspense = ({ ...props }: ColorPaletteProps) => {
  return (
    <>
      <Suspense fallback={<Lead className='text-sm'>loading...</Lead>}>
        <LazyColorPalette {...props} />
      </Suspense>
    </>
  );
};
