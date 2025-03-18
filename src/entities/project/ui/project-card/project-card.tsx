import { Link } from '@tanstack/react-router';
import { Pencil, Settings2, Trash2 } from 'lucide-react';
import { memo, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { AppPopover, cn, type ModalType, type PopoverItems, usePopover } from '@/shared';

import type { ProjectSchema } from '../../model';

import { getCompletionPercentage } from '../../lib';
import { BaseProjectCard } from '../base-project-card';

export interface ProjectCardProps {
  onProjectAction?: (type: ModalType['type'], project: ProjectSchema) => void;
  project: ProjectSchema;
}

const DEFAULT_COLOR = '#1A1A3D';

export const ProjectCard = memo(({ project, onProjectAction }: ProjectCardProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const completionPercentage = useMemo(() => {
    return getCompletionPercentage(project.allTaskCount, project.taskCount);
  }, [project.allTaskCount, project.taskCount]);

  const popoverItems = useMemo<PopoverItems[]>(
    () => [
      {
        label: 'Редактировать',
        icon: Pencil,
        onClick: () => {
          onProjectAction?.('edit', project);
        },
        type: 'success-ghost',
      },
      {
        label: 'Удалить',
        icon: Trash2,
        onClick: () => {
          onProjectAction?.('delete', project);
        },
        type: 'danger-ghost',
      },
    ],
    [onProjectAction, project]
  );

  const progressBarStyle = useMemo(
    () => ({
      borderColor: project.color?.hex ?? DEFAULT_COLOR,
      width: completionPercentage,
    }),
    [project.color?.hex, completionPercentage]
  );

  const popoverTrigger = useMemo(
    () => (
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleTogglePopover();
        }}
        className='me-3 size-fit p-2 opacity-0 transition-all focus:outline-none'
        variant='ghost'
      >
        <Settings2 size={20} />
      </Button>
    ),
    [handleTogglePopover]
  );

  return (
    <Link
      params={{ projectId: project.id, spaceId: project.spaceId }}
      to='/space/$spaceId/project/$projectId'
    >
      <div
        className={cn(
          'relative mb-3 cursor-pointer rounded-md bg-white py-4 shadow-sm transition-all hover:shadow-[0_-0.5px_3px_0px_rgba(0,0,0,0.2)] [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100',
          isOpen && '[&_button]:opacity-100'
        )}
      >
        <div className='flex items-center justify-between'>
          <BaseProjectCard
            color={project.color?.hex}
            name={project.name}
          />

          <AppPopover
            onOpenChange={handleTogglePopover}
            trigger={popoverTrigger}
            className='w-48 p-2'
            items={popoverItems}
            isOpen={isOpen}
          />
        </div>

        <div
          className='absolute bottom-0 left-0 border-b'
          style={progressBarStyle}
        />
      </div>
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';
