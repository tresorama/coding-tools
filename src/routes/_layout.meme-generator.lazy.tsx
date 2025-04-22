import { createLazyFileRoute } from '@tanstack/react-router';

import { ViewMemeGenerator } from '@/components/views/meme-generator';

export const Route = createLazyFileRoute('/_layout/meme-generator')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ViewMemeGenerator />;
}
