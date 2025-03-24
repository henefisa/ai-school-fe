'use client';

import type React from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Button } from '@/components/ui/button';
import { BellIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RoleSwitcher } from '@/components/role-switcher';
import { Profile } from '@/components/header/profile';
import { useStoreContext } from '@/contexts/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useStoreContext((state) => state.userRole.role);

  if (!role) {
    return null;
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='flex h-14 items-center justify-between px-4 md:px-6'>
          <div className='flex items-center gap-4 md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='md:hidden'>
                  <MenuIcon className='h-5 w-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-72 p-0'>
                <DashboardSidebar role={role} />
              </SheetContent>
            </Sheet>
            <span className='text-lg font-bold'>EduManage</span>
          </div>
          <div className='hidden md:block'>
            <h1 className='text-lg font-semibold'>Admin Dashboard</h1>
          </div>
          <div className='flex items-center gap-4'>
            <RoleSwitcher />
            <Button variant='outline' size='icon'>
              <BellIcon className='h-5 w-5' />
              <span className='sr-only'>Notifications</span>
            </Button>
            <Profile />
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <aside className='hidden w-64 border-r md:block'>
          <DashboardSidebar role={role} />
        </aside>
        <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
      </div>
    </div>
  );
}
