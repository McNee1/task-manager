import { Link } from '@tanstack/react-router';
import { Pencil, Settings2, Trash2 } from 'lucide-react';
import { memo, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { BaseProjectCard, ProjectSchema } from '@/entities';
import { AppPopover, cn, type ModalType, type PopoverItems, usePopover } from '@/shared';

import { getCompletionPercentage } from '../../lib';

export interface ProjectCardProps {
  onProjectAction?: (type: ModalType['type'], project: ProjectSchema) => void;
  project: ProjectSchema;
}

const DEFAULT_COLOR = '#1A1A3D';

/**
 * ProjectCard is a UI component that renders a single project card inside a
 * Projects component. It contains the project name, an edit button, and a
 * button to add a project to the group. The component also contains a
 * Popover with two items: "Edit" and "Delete". The "Edit" item triggers the
 * onProjectAction callback with the "edit" type and the project object. The
 * "Delete" item triggers the onProjectAction callback with the "delete" type
 * and the project object.
 *
 * @param {ProjectCardProps} props
 * @param {ProjectSchema} props.project - The project object
 * @param {(type: ModalType['type'], project: ProjectSchema) => void} props.onProjectAction
 *   - A callback that is triggered when the "Edit" or "Delete" button is
 *   clicked
 */
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
        <Settings2 />
      </Button>
    ),
    [handleTogglePopover]
  );

  return (
    <Link
      params={{ projectId: project.id, spaceId: project.spaceId }}
      to='/space/$spaceId/project-workspace/$projectId'
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
