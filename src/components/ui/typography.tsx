import { cn } from '@/shared/lib';

interface Props {
  children: string;
  className?: string;
}

const H1 = ({ className, children }: Props) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
};

const H2 = ({ className, children }: Props) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  );
};

const H3 = ({ className, children }: Props) => {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  );
};

const H4 = ({ className, children }: Props) => {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  );
};

const P = ({ className, children }: Props) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
  );
};

const Blockquote = ({ className, children }: Props) => {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
};

const InlineCode = ({ className, children }: Props) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  );
};

const Lead = ({ className, children }: Props) => {
  return <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>;
};

const Large = ({ className, children }: Props) => {
  return <div className={cn('text-lg font-semibold', className)}>{children}</div>;
};

const Muted = ({ className, children }: Props) => {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>;
};

const ErrorText = ({ className, children }: Props) => {
  return <p className={cn('font-medium text-red-600', className)}>{children}</p>;
};

export { Blockquote, ErrorText, H1, H2, H3, H4, InlineCode, Large, Lead, Muted, P };
