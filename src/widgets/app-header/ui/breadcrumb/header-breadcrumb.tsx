import { Pencil, Trash2 } from 'lucide-react';
import { Fragment, ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { getRouteIcon, getRouteName, ModalType, PopoverItems } from '@/shared';

import { renderBreadcrumbItem } from '../../lib';
import { useHeaderLocation } from '../../model';
import { MenuPopover } from '../menu-popover';

interface BreadcrumbProps {
  curProjectName: string | null;
  curSpaceName: string | null;
  isPending: boolean;
  onToggleModal: (value: ModalType['type']) => void;
}

interface BreadcrumbItem {
  condition: () => boolean;
  content: () => ReactNode;
}

export const HeaderBreadcrumb = ({
  onToggleModal,
  curSpaceName,
  isPending,
  curProjectName,
}: BreadcrumbProps) => {
  const { isSpaceLocation, pathname, isProjectLocation } = useHeaderLocation();

  const IconPath = getRouteIcon(pathname);

  const IconSpace = getRouteIcon('/space/$spaceId');
  const IconProject = getRouteIcon('/space/$spaceId/project/$projectId');

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

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      condition: () => isSpaceLocation,
      content: () => (
        <li className='inline-flex items-center text-sm font-medium text-slate-500'>
          <MenuPopover
            popoverActions={popoverActions}
            triggerName={curSpaceName}
          />
        </li>
      ),
    },
    {
      condition: () => !isSpaceLocation && !isProjectLocation,
      content: () =>
        renderBreadcrumbItem({ name: getRouteName(pathname), icon: IconPath }),
    },
    {
      condition: () => isProjectLocation,

      content: () => (
        <>
          <div className='flex items-center gap-5'>
            {renderBreadcrumbItem({
              name: curSpaceName,
              icon: IconSpace,
              isLink: true,
              extraClass: 'hover:text-light-sky',
              to: '/space/$spaceId',
            })}

            {renderBreadcrumbItem({
              name: curProjectName,
              icon: IconProject,
            })}
          </div>
        </>
      ),
    },
  ];

  if ((isSpaceLocation || isProjectLocation) && isPending) {
    return <Skeleton className='h-5 w-20' />;
  }

  return (
    <nav
      aria-label='Breadcrumb'
      className='flex'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {breadcrumbItems.map((item, id) => (
          <Fragment key={id}>{item.condition() && item.content()}</Fragment>
        ))}
      </ol>
    </nav>
  );
};
