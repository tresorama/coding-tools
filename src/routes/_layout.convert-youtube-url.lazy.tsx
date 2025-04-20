import { createLazyFileRoute } from '@tanstack/react-router';

import { ViewConvertYoutubeUrl } from '@/components/views/convert-youtube-url';

export const Route = createLazyFileRoute('/_layout/convert-youtube-url')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ViewConvertYoutubeUrl />;
}
