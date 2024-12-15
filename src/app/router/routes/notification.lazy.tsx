import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/notification')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello Notification</div>;
}
