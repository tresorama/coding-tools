import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '@/components/mine/error-boundary';
import { TanstackRouterProvider } from '@/lib/tanstack/tanstack-router-provider';
// import { TanstackQueryProvider } from '@/lib/tanstack/tanstack-query-provider.tsx';
// import { TsrReactQueryProvider } from '@/lib/api-client/ts-rest/tsr.client.react-query.provider';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* <TanstackQueryProvider> */}
      {/* <TsrReactQueryProvider> */}
      <TanstackRouterProvider />
      {/* </TsrReactQueryProvider> */}
      {/* </TanstackQueryProvider> */}
    </ErrorBoundary>
  </StrictMode>
);