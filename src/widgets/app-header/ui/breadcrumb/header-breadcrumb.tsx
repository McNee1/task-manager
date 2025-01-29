import { Pencil, Trash2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { getRouteInfo, PopoverItems } from '@/shared';

import { ModalType, useSpaceLocation } from '../../model';
import { MenuPopover } from '../menu-popover';

interface BreadcrumbProps {
  curSpaceName: string | null;
  isPending: boolean;
  onToggleModal: (value: ModalType['type']) => void;
}

export const HeaderBreadcrumb = ({
  onToggleModal,
  curSpaceName,
  isPending,
}: BreadcrumbProps) => {
  const { isSpaceLocation, pathname } = useSpaceLocation();

  const { icon: IconPath, name } = getRouteInfo(pathname);

  const popoverActions: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        onToggleModal('edit');
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        onToggleModal('delete');
      },
      type: 'danger-ghost',
    },
  ];

  if (isSpaceLocation() && isPending) {
    return <Skeleton className='h-5 w-20' />;
  }

  if (isSpaceLocation() && curSpaceName === null) {
    return null;
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center text-sm font-medium text-slate-500'>
          {curSpaceName ? (
            <MenuPopover
              popoverActions={popoverActions}
              triggerName={curSpaceName}
            />
          ) : (
            <div className='inline-flex gap-x-3'>
              <IconPath size={19} />
              {name}
            </div>
          )}
        </li>
      </ol>
    </nav>
  );
};
