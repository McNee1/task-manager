import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const badgeVariants = cva(
  'inline-flex items-center rounded-md  px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground  hover:bg-primary/70',
        success: 'bg-green-200 text-green-600 hover:bg-green-200/70',
        danger: 'bg-red-100 text-red-500  hover:bg-red-100/70',
        primary: 'bg-sky-200 text-sky-600 hover:bg-sky-200/70',
        warning: 'bg-amber-100 text-amber-600 hover:bg-amber-100/70',
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
