import { FolderClosed, Pencil, Settings2, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppPopover, cn, type ModalType, type PopoverItems, usePopover } from '@/shared';

import type { ProjectSchema } from '../../model';

import { getCompletionPercentage } from '../../lib';

export interface ProjectCardProps {
  onProjectAction: (type: ModalType['type'], project: ProjectSchema) => void;
  project: ProjectSchema;
}

const DEFAULT_COLOR = '#1A1A3D';

export const ProjectCard = ({ project, onProjectAction }: ProjectCardProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const completionPercentage = getCompletionPercentage(
    project.allTaskCount,
    project.taskCount
  );

  const popoverItems: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        onProjectAction('edit', project);
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        onProjectAction('delete', project);
      },
      type: 'danger-ghost',
    },
  ];

  const renderPopoverList = popoverItems.map((item) => (
    <Button
      className='h-8 w-full justify-start gap-4 font-normal focus-visible:ring-0 focus-visible:ring-offset-0'
      onClick={item.onClick}
      variant={item.type}
      key={item.label}
    >
      {item.icon && <item.icon className='size-4' />}
      {item.label}
    </Button>
  ));

  return (
    <>
      <div
        className={cn(
          'relative mb-3 cursor-pointer rounded-md py-4 shadow-sm transition-all hover:shadow-[0_-0.5px_3px_0px_rgba(0,0,0,0.2)] [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100',
          isOpen && '[&_button]:opacity-100'
        )}
      >
        <div className='flex items-center justify-between'>
          <div className='inline-flex items-center gap-x-5 px-4'>
            <FolderClosed
              stroke={project.color?.hex ?? DEFAULT_COLOR}
              strokeWidth={0.9}
              size={23}
            />
            <div>{project.name}</div>
          </div>

          <AppPopover
            trigger={
              <Button
                className='me-3 size-fit p-2 opacity-0 transition-all focus:outline-none'
                onClick={handleTogglePopover}
                variant='ghost'
              >
                <Settings2 size={20} />
              </Button>
            }
            onOpenChange={handleTogglePopover}
            className='w-48 p-2'
            isOpen={isOpen}
          >
            {renderPopoverList}
          </AppPopover>
        </div>

        <div
          style={{
            borderColor: project.color?.hex ?? DEFAULT_COLOR,
            width: completionPercentage,
          }}
          className='absolute bottom-0 left-0 border-b'
        ></div>
      </div>
    </>
  );
};
