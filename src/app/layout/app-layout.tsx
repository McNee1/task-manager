import { CircleXIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { SidebarInset, SidebarProvider, Toaster } from '@/shared';
import { AppHeader, AppSidebar } from '@/widgets';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset
          style={{ scrollbarWidth: 'thin' }}
          className='overflow-x-auto px-6'
        >
          <AppHeader />
          {children}
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
