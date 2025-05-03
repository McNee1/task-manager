import type { LucideIcon } from 'lucide-react';

import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

import { cn, ValidRoutes } from '@/shared';

interface BaseItem {
  extraClass?: string;
  icon: LucideIcon | null;
  name: string | null;
}

interface LinkItem extends BaseItem {
  isLink: true;
  to: ValidRoutes;
}

interface NonLinkItem extends BaseItem {
  icon: LucideIcon | null;
  isLink?: false;
}

type ItemRender = LinkItem | NonLinkItem;

export function BreadcrumbItem({
  icon,
  name,
  extraClass,
  isLink,
  ...rest
}: ItemRender): ReactNode {
  const Icon = icon;

  const classes = cn(
    'flex items-center gap-x-3 text-sm font-medium text-slate-500',
    extraClass
  );

  const content = (
    <>
      {Icon && <Icon size={19} />}
      {name}
    </>
  );

  if (isLink && 'to' in rest) {
    return (
      <Link
        className={classes}
        to={rest.to}
      >
        {content}
      </Link>
    );
  }

  return <li className={classes}>{content}</li>;
}
