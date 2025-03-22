'use client';

import { useState, useEffect, use } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Calendar, MessageSquare, Search, User } from 'lucide-react';
import { AuthContext } from '@/contexts/auth';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { getStudentByParentId } from '@/queries/student/get-student-by-parent-id';
import { getDisplayName } from '@/utils/get-display-name';
import { GradesTab } from '@/app/dashboard/children/grades-tab';
import { AttendancesTab } from '@/app/dashboard/children/attendances-tab';
import { AssignmentsTab } from '@/app/dashboard/children/assignments-tab';
import { CalendarTab } from '@/app/dashboard/children/calendar-tab';
import { TeachersTab } from '@/app/dashboard/children/teachers-tab';
import { Badge } from '@/components/ui/badge';

export default function ChildrenPage() {
  const { user } = use(AuthContext);
  const client = createClient();
  const { data } = useQuery(getStudentByParentId(client, user?.id ?? ''));
  const [selectedChild, setSelectedChild] = useState(data?.students[0].id);
  const [activeTab, setActiveTab] = useState<string>('grades');

  const selectedChildData = data?.students.find(
    (child) => child.id === selectedChild
  );

  useEffect(() => {
    setSelectedChild(data?.students[0].id);
  }, [data]);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Children</h1>
          <p className='text-muted-foreground'>
            View and monitor your children's academic progress
          </p>
        </div>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-md pl-8 sm:w-[300px]'
          />
        </div>
      </div>
      <div className='grid gap-6 md:grid-cols-12'>
        <div className='md:col-span-4 lg:col-span-3'>
          <Card>
            <CardHeader>
              <CardTitle>Children</CardTitle>
              <CardDescription>Select a child to view details</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {data?.students &&
                data.students.length > 0 &&
                data.students.map((child) => (
                  <div
                    key={child.id}
                    className={`flex items-center gap-4 p-3 rounded-md cursor-pointer hover:bg-muted ${
                      selectedChild === child.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedChild(child.id)}
                  >
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={child.profiles.avatar_url}
                        alt={getDisplayName(child.profiles)}
                      />
                      <AvatarFallback>
                        {getDisplayName(child.profiles)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <p className='font-medium'>
                        {getDisplayName(child.profiles)}
                      </p>
                      <p className='text-sm text-muted-foreground'>{`Grade ${child.grade}`}</p>
                    </div>
                    <div className='flex flex-col items-end text-xs'>
                      <Badge variant='secondary' className='mb-1'>
                        1 new grades
                      </Badge>
                      <Badge variant='outline'>2 assignments</Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
        <div className='md:col-span-8 lg:col-span-9'>
          {selectedChildData && (
            <div className='space-y-6'>
              <Card>
                <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={selectedChildData.profiles.avatar_url}
                      alt={getDisplayName(selectedChildData.profiles)}
                    />
                    <AvatarFallback>
                      {getDisplayName(selectedChildData.profiles)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <CardTitle>
                        {getDisplayName(selectedChildData.profiles)}
                      </CardTitle>
                      <Button variant='outline' size='sm'>
                        <MessageSquare className='mr-2 h-4 w-4' />
                        Message Teacher
                      </Button>
                    </div>
                    <CardDescription>
                      {`Grade ${selectedChildData.grade} • Teacher:`}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-3'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>GPA</span>
                        <span className='text-sm text-muted-foreground'>
                          {`${selectedChildData.gpa}/4.0`}
                        </span>
                      </div>
                      {selectedChildData.gpa && (
                        <Progress
                          value={selectedChildData.gpa * 25}
                          className='h-2'
                        />
                      )}
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>Attendance</span>
                        <span className='text-sm text-muted-foreground'>
                          50%
                        </span>
                      </div>
                      <Progress value={50} className='h-2' />
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>Upcoming</span>
                        <span className='text-sm text-muted-foreground'>
                          assignments
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <Button variant='outline' size='sm' className='w-full'>
                          <User className='mr-2 h-4 w-4' />
                          View Profile
                        </Button>
                        <Button size='sm' className='w-full'>
                          <Calendar className='mr-2 h-4 w-4' />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value='grades'>Grades</TabsTrigger>
                  <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                  <TabsTrigger value='assignments'>Assignments</TabsTrigger>
                  <TabsTrigger value='calendar'>Calendar</TabsTrigger>
                  <TabsTrigger value='teachers'>Teachers</TabsTrigger>
                </TabsList>
                <GradesTab />
                <AttendancesTab />
                <AssignmentsTab />
                <CalendarTab />
                <TeachersTab />
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
