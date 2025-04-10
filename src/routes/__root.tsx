import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { HomeIcon } from 'lucide-react';

import { Toaster } from '@/components/mine/ui/toast';

export const Route = createRootRoute({
  component: () => (
    <>
      <main className='w-full h-screen flex flex-col'>
        <div className="px-3 py-2 flex justify-between items-center gap-2">
          <Link to="/" className="[&.active]:font-bold">
            <HomeIcon className='size-4' />
          </Link>{' '}
        </div>
        <hr />
        <div className='min-h-0 flex-1 overflow-y-auto'>
          <Outlet />
        </div>
      </main>
      <Toaster richColors position='bottom-center' />
    </>
  ),
});