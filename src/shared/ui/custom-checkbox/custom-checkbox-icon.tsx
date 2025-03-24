import { Check } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

import { useCheckBoxContext } from './custom-checkbox-context';

type CustomCheckboxIconProps = ComponentProps<'div'>;

export const CustomCheckboxIcon = ({
  children,
  className,
  ...props
}: CustomCheckboxIconProps) => {
  const { checked } = useCheckBoxContext();
  return (
    <div
      className={cn(
        'text-white',
        'transition-transform duration-300',
        checked ? 'scale-100' : 'scale-0',
        className
      )}
      {...props}
    >
      {children ?? (
        <Check
          className={cn(
            'size-full text-white',
            'transition-transform duration-300',
            checked ? 'scale-100' : 'scale-0'
          )}
        />
      )}
    </div>
  );
};
