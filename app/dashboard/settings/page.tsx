'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Globe,
  Shield,
  Users,
  BookOpen,
  CreditCard,
  Library,
  Server,
} from 'lucide-react';

import GeneralSettings from '@/components/settings/general-settings';
import ProfileSettings from '@/components/settings/profile-settings';
import AccountSettings from '@/components/settings/account-settings';
import UserManagement from '@/components/settings/user-management';
import CourseManagement from '@/components/settings/course-management';
import FeeManagement from '@/components/settings/fee-management';
import LibraryManagement from '@/components/settings/library-management';
import SystemSettings from '@/components/settings/system-settings';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  if (!user) return null;

  // Define tabs based on user role
  const getTabs = () => {
    const commonTabs = [
      {
        id: 'general',
        label: 'General',
        icon: Globe,
        component: <GeneralSettings />,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        component: <ProfileSettings />,
      },
      {
        id: 'account',
        label: 'Account',
        icon: Shield,
        component: <AccountSettings />,
      },
    ];

    const roleSpecificTabs = {
      admin: [
        {
          id: 'users',
          label: 'User Management',
          icon: Users,
          component: <UserManagement />,
        },
        {
          id: 'courses',
          label: 'Course Management',
          icon: BookOpen,
          component: <CourseManagement />,
        },
        {
          id: 'fees',
          label: 'Fee Management',
          icon: CreditCard,
          component: <FeeManagement />,
        },
        {
          id: 'library',
          label: 'Library Management',
          icon: Library,
          component: <LibraryManagement />,
        },
        {
          id: 'system',
          label: 'System Settings',
          icon: Server,
          component: <SystemSettings />,
        },
      ],
      teacher: [
        {
          id: 'courses',
          label: 'Course Management',
          icon: BookOpen,
          component: <CourseManagement />,
        },
      ],
      parent: [],
      student: [],
    };

    return [...commonTabs, ...(roleSpecificTabs[user.role] || [])];
  };

  const tabs = getTabs();

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences.
        </p>
      </div>

      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0'>
        <aside className='lg:w-1/4'>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
              <nav className='flex flex-col space-y-1 px-2 py-2'>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <tab.icon className='h-4 w-4' />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className='flex-1'>
          <Card>
            <CardHeader>
              <CardTitle>
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </CardTitle>
              <CardDescription>
                {activeTab === 'general' &&
                  'Manage your general settings and preferences.'}
                {activeTab === 'profile' && 'Update your profile information.'}
                {activeTab === 'account' &&
                  'Manage your account security settings.'}
                {activeTab === 'users' &&
                  'Manage users, roles, and permissions.'}
                {activeTab === 'courses' && 'Manage courses and assignments.'}
                {activeTab === 'fees' &&
                  'Manage fee categories and payment settings.'}
                {activeTab === 'library' &&
                  'Manage library resources and settings.'}
                {activeTab === 'system' && 'Configure system-wide settings.'}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='pt-6'>
              {tabs.find((tab) => tab.id === activeTab)?.component}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
