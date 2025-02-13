import { createFileRoute } from '@tanstack/react-router';

import { ProjectPage } from '@/pages';

export const Route = createFileRoute('/space/$spaceId_/project/$projectId')({
  component: ProjectPage,
});
