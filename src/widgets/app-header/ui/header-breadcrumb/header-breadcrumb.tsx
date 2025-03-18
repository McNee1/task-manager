import { Pencil, Trash2 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { getRouteIcon, getRouteName, ModalType, PopoverItems } from '@/shared';

import { useHeaderLocation } from '../../model';
import { MenuPopover } from '../menu-popover';
import { ProjectBreadcrumb } from './project-breadcrumb';
import { renderBreadcrumbItem } from './render-breadcrumb-Item';

interface BreadcrumbProps {
  curSpaceName: string | null;
  onToggleModal: (value: ModalType['type']) => void;
}

export const HeaderBreadcrumb = ({ onToggleModal, curSpaceName }: BreadcrumbProps) => {
  const { isSpaceLocation, pathname, isProjectLocation } = useHeaderLocation();

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

        {!isSpaceLocation &&
          !isProjectLocation &&
          renderBreadcrumbItem({ name: getRouteName(pathname), icon: IconPath })}

        {isProjectLocation && <ProjectBreadcrumb curSpaceName={curSpaceName} />}
      </ol>
    </nav>
  );
};
