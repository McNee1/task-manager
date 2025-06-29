import { Pencil, Trash2 } from 'lucide-react';

import { getRouteIcon, getRouteName, ModalType, PopoverItems, Skeleton } from '@/shared';

import { useLocationInfo } from '../../model';
import { MenuPopover } from '../menu-popover';
import { BreadcrumbItem } from './breadcrumb-Item';
import { ProjectBreadcrumb } from './project-breadcrumb';

interface BreadcrumbProps {
  curSpaceName: string | null;
  onToggleModal: (value: ModalType['type']) => void;
}

export const HeaderBreadcrumb = ({ onToggleModal, curSpaceName }: BreadcrumbProps) => {
  const { isSpaceLocation, pathname, isProjectLocation } = useLocationInfo();

  const IconPath = getRouteIcon(pathname);

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

  if (isSpaceLocation && !curSpaceName) {
    return <Skeleton className='h-5 w-20' />;
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {isSpaceLocation && (
          <li className='inline-flex items-center text-sm font-medium text-slate-500'>
            <MenuPopover
              popoverActions={popoverActions}
              triggerName={curSpaceName}
            />
          </li>
        )}

        {!isSpaceLocation && !isProjectLocation && (
          <BreadcrumbItem
            name={getRouteName(pathname)}
            icon={IconPath}
          />
        )}

        {isProjectLocation && <ProjectBreadcrumb curSpaceName={curSpaceName} />}
      </ol>
    </nav>
  );
};
