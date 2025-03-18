'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  CreditCardIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  MessageSquareIcon,
  SchoolIcon,
  SettingsIcon,
  UsersIcon,
  FileTextIcon,
  ClipboardCheckIcon,
  BellIcon,
  LucideIcon,
} from 'lucide-react';
import { Tables } from '@/utils/supabase/database.types';

type Role = Tables<'user_roles'>['role'];

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  role: Role;
}

interface NavItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  type?: 'separator';
}

export function DashboardSidebar({
  className,
  role,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems: NavItem[] = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboardIcon,
      },
      {
        name: 'Calendar',
        href: '/dashboard/calendar',
        icon: CalendarIcon,
      },
      {
        name: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquareIcon,
      },
    ];

    const roleSpecificItems: Record<Role, NavItem[]> = {
      ADMIN: [
        {
          name: 'Students',
          href: '/dashboard/students',
          icon: GraduationCapIcon,
        },
        {
          name: 'Teachers',
          href: '/dashboard/teachers',
          icon: UsersIcon,
        },
        {
          name: 'Courses',
          href: '/dashboard/courses',
          icon: BookOpenIcon,
        },
        {
          name: 'Finance',
          href: '/dashboard/finance',
          icon: CreditCardIcon,
        },
        {
          name: 'Reports',
          href: '/dashboard/reports',
          icon: BarChart3Icon,
        },
        {
          name: 'Library',
          href: '/dashboard/library',
          icon: LibraryIcon,
        },
      ],
      TEACHER: [
        {
          name: 'My Classes',
          href: '/dashboard/classes',
          icon: UsersIcon,
        },
        {
          name: 'Students',
          href: '/dashboard/classes/students',
          icon: GraduationCapIcon,
        },
        {
          name: 'Attendance',
          href: '/dashboard/attendance',
          icon: ClipboardCheckIcon,
        },
        {
          name: 'Grades',
          href: '/dashboard/grades',
          icon: BarChart3Icon,
        },
        {
          name: 'Lesson Plans',
          href: '/dashboard/lessons',
          icon: BookOpenIcon,
        },
        {
          name: 'Assignments',
          href: '/dashboard/assignments',
          icon: FileTextIcon,
        },
      ],
      STUDENT: [
        {
          name: 'My Courses',
          href: '/dashboard/courses',
          icon: BookOpenIcon,
        },
        {
          name: 'Assignments',
          href: '/dashboard/my-assignments',
          icon: FileTextIcon,
        },
        {
          name: 'My Lessons',
          href: '/dashboard/my-lessons',
          icon: BookOpenIcon,
        },
        {
          name: 'Grades',
          href: '/dashboard/grades',
          icon: BarChart3Icon,
        },
        {
          name: 'Library',
          href: '/dashboard/library',
          icon: LibraryIcon,
        },
        {
          name: 'Attendance',
          href: '/dashboard/attendance',
          icon: ClipboardCheckIcon,
        },
      ],
      PARENT: [
        {
          name: 'My Children',
          href: '/dashboard/children',
          icon: UsersIcon,
        },
        {
          name: 'Attendance',
          href: '/dashboard/attendance',
          icon: ClipboardCheckIcon,
        },
        {
          name: 'Grades',
          href: '/dashboard/grades',
          icon: BarChart3Icon,
        },
        {
          name: 'Fees',
          href: '/dashboard/fees',
          icon: CreditCardIcon,
        },
        {
          name: 'Announcements',
          href: '/dashboard/announcements',
          icon: BellIcon,
        },
      ],
      STAFF: [],
    };

    const settingsItem: NavItem[] = [
      {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: SettingsIcon,
      },
    ];

    return [
      ...commonItems,
      { type: 'separator', name: 'Main Menu' } as NavItem,
      ...roleSpecificItems[role],
      { type: 'separator', name: 'Preferences' } as NavItem,
      ...settingsItem,
    ];
  };

  const navItems = getNavItems();

  return (
    <div className={cn('h-full', className)} {...props}>
      <div className='flex h-full flex-col'>
        <div className='flex h-14 items-center border-b px-4'>
          <Link href='/dashboard' className='flex items-center gap-2'>
            <SchoolIcon className='h-6 w-6 text-primary' />
            <h2 className='text-lg font-semibold tracking-tight'>EduManage</h2>
          </Link>
        </div>
        <div className='flex-1 overflow-auto py-2'>
          <nav className='grid gap-1 px-2'>
            {navItems.map((item, index) => {
              if (item.type === 'separator') {
                return (
                  <div key={index} className='my-2'>
                    <div className='mb-2 px-4 text-xs font-semibold text-muted-foreground'>
                      {item.name}
                    </div>
                    <div className='h-px bg-border' />
                  </div>
                );
              }

              if (!item.href) {
                return null;
              }

              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-primary'
                      )}
                    />
                  )}

                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
