import { createLazyFileRoute } from '@tanstack/react-router';

import { ViewCompareTexts } from '@/components/views/compare-texts';

export const Route = createLazyFileRoute('/_layout/compare-texts')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ViewCompareTexts />;
}
