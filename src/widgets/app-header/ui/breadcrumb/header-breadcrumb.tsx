import { Pencil, Trash2 } from 'lucide-react';

import { getRouteInfo } from '@/shared/lib';
import { PopoverItems } from '@/shared/types';

import { ModalType, useSpaceLocation } from '../../model';
import { MenuPopover } from '../menu-popover';

interface BreadcrumbProps {
  curSpaceName: string | null;

  onToggleModal: (value: ModalType['type']) => void;
}

export const HeaderBreadcrumb = ({ onToggleModal, curSpaceName }: BreadcrumbProps) => {
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

  const isShowOnSpacePage = isSpaceLocation() && curSpaceName === null;

  if (isShowOnSpacePage) {
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
