import { Fragment, useMemo } from 'react';
import { createFileRoute, Link, Outlet, useLocation, LinkProps } from '@tanstack/react-router';

import { cn } from '@/lib/shadcn/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/shadcn/ui/sidebar';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});


const createPages = (pathname: string) => {

  type Page = {
    label: string;
    to: LinkProps['to'];
    isActive: boolean,
  };
  type PageGroup = {
    label: string;
    pages: Page[];
    showTitle: boolean;
  };

  const pagesGroups: PageGroup[] = [
    {
      label: "Base",
      showTitle: false,
      pages: [
        {
          label: 'Home',
          to: "/",
          isActive: pathname === "/",
        },
      ]
    },
    {
      label: "Tools",
      showTitle: true,
      pages: [
        {
          label: "Compare Texts",
          to: '/compare-texts',
          isActive: pathname === '/compare-texts',
        }
      ]
    }
  ];

  return {
    pagesGroups
  };
};


function LayoutComponent() {
  return (
    <SidebarProvider className="SIDEBAR-PROVIDER min-h-0 h-full items-end overflow-hidden">
      <Nested />
    </SidebarProvider>
  );
}


const Nested = () => {
  // router
  const location = useLocation();

  // local state
  const sidebar = useSidebar();
  const { pagesGroups } = useMemo(() => createPages(location.pathname), [location.pathname]);


  return (
    <>
      {/* Sidebar */}
      <Sidebar className="SIDEBAR">
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          {/* Sidebar - Pages */}
          {pagesGroups.map((group, groupIndex) => (
            <Fragment key={group.label}>
              <SidebarGroup data-group-label={group.label}>
                <SidebarGroupLabel className={cn("text-white/30 uppercase", !group.showTitle && "hidden")}>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.pages.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.to}
                            onClick={() => sidebar.setOpenMobile(false)}
                            className={cn(
                              'text-xs text-white/40 hover:text-white cursor-pointer',
                              item.isActive && 'text-white bg-white/20'
                            )}
                          >
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              {groupIndex === pagesGroups.length - 1 ? null : (
                <SidebarSeparator />
              )}
            </Fragment>
          ))}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="CONTENT h-full w-full flex flex-col">
        <div className="STATUS-BAR flex items-center border-b">
          <SidebarTrigger className="m-2 [.SIDEBAR-PROVIDER:has([data-state=expanded])_&]:w-0 overflow-hidden" />
          {/* {activeChatName && (
            <span className="text-xs opacity-50">Chat ⟶ {activeChatName}</span>
          )} */}
        </div>
        <div className="OUTLET-WRAPPER min-h-0 h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};
