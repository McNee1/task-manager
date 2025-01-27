import { FolderClosed, Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { getCompletionPercentage } from '../../lib';
import { ProjectSchema } from '../../model';

interface ProjectCardProps {
  project: ProjectSchema;
}

const DEFAULT_COLOR = '#1A1A3D';

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const completionPercentage = getCompletionPercentage(
    project.allTaskCount,
    project.taskCount
  );

  return (
    <>
      <div className='relative mb-3 cursor-pointer rounded-md py-4 shadow-sm transition-all hover:shadow-[0_-0.5px_3px_0px_rgba(0,0,0,0.2)] [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100'>
        <div className='flex items-center justify-between'>
          <div className='inline-flex items-center gap-x-5 px-4'>
            <FolderClosed
              stroke={project.color?.hex ?? DEFAULT_COLOR}
              strokeWidth={0.9}
              size={23}
            />
            <div>{project.name}</div>
          </div>
          <Button
            className='me-3 size-fit p-2 opacity-0 transition-all focus:outline-none'
            variant='ghost'
          >
            <Settings2 size={20} />
          </Button>
        </div>

        <div
          style={{
            borderColor: project.color?.hex ?? DEFAULT_COLOR,
            width: completionPercentage,
          }}
          className='absolute bottom-0 left-0 border-b'
          id='status-border'
        ></div>
      </div>
    </>
  );
};
