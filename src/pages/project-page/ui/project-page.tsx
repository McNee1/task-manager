import { useParams } from '@tanstack/react-router';

import { ProjectColumns } from './container';

export const ProjectPage = () => {
  const { projectId } = useParams({ strict: false });

  return (
    <div className='flex flex-col'>
      <div>other content</div>

      <ProjectColumns projectId={projectId}></ProjectColumns>
    </div>
  );
};
