import { createFileRoute } from '@tanstack/react-router';

import { SpacePage } from '@/pages';

export const Route = createFileRoute('/space/$spaceId')({
  component: SpacePage,
});
