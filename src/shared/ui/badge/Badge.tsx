import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const badgeVariants = cva(
  'focus:outline-hidden inline-flex items-center  rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-green-200 text-green-600',
        danger: 'bg-red-100 text-red-400',
        primary: 'bg-sky-200 text-sky-600',
        warning: 'bg-amber-100 text-amber-600',
        link: 'bg-gray-100 text-black hover:bg-gray-600',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};
