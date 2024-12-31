import { CircleXIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { AppHeader, AppSidebar } from '@/widgets';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className='h-full px-8'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster
        icons={{ close: <CircleXIcon /> }}
        closeButton={true}
        richColors
      />
    </>
  );
}
