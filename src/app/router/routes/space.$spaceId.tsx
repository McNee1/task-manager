import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/space/$spaceId')({
  component: RouteComponent,

  notFoundComponent: () => {
    return <p>Post not found</p>;
  },
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  console.log(spaceId);
  return <div>Hello {spaceId}</div>;
}
