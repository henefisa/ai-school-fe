import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  CalendarIcon,
  CreditCardIcon,
  MessageSquareIcon,
  BookOpenIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function ParentDashboard() {
  // Sample children data
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '10A',
      attendance: 98,
      gpa: 3.8,
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Noah Johnson',
      grade: '7B',
      attendance: 95,
      gpa: 3.5,
      avatar: '/placeholder.svg',
    },
  ];

  // Sample upcoming events
  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'Mar 20, 2025',
      type: 'meeting',
    },
    { id: 2, title: 'Science Fair', date: 'Apr 5, 2025', type: 'event' },
    {
      id: 3,
      title: 'End of Quarter Exams',
      date: 'Mar 25, 2025',
      type: 'exam',
    },
  ];

  // Sample fee information
  const fees = [
    {
      id: 1,
      description: 'Tuition Fee (Q1)',
      amount: 1500,
      status: 'Paid',
      dueDate: 'Jan 15, 2025',
    },
    {
      id: 2,
      description: 'Tuition Fee (Q2)',
      amount: 1500,
      status: 'Paid',
      dueDate: 'Mar 15, 2025',
    },
    {
      id: 3,
      description: 'Field Trip Fee',
      amount: 75,
      status: 'Pending',
      dueDate: 'Apr 1, 2025',
    },
  ];

  // Sample announcements
  const announcements = [
    {
      id: 1,
      title: 'School Closure - Spring Break',
      content:
        'The school will be closed for Spring Break from April 10-17, 2025.',
      date: 'Mar 15, 2025',
      priority: 'high',
    },
    {
      id: 2,
      title: 'New Library Resources Available',
      content:
        "We've added new digital resources to our library. Students can now access e-books and research materials online.",
      date: 'Mar 12, 2025',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Sports Day Announcement',
      content:
        'Annual Sports Day will be held on April 25, 2025. All parents are invited to attend.',
      date: 'Mar 10, 2025',
      priority: 'medium',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Parent Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here&apos;s an overview of your children&apos;s
          progress.
        </p>
      </div>

      {/* Quick Actions */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Link href='/dashboard/children'>
          <Card className='hover:bg-accent/50 transition-colors cursor-pointer'>
            <CardContent className='p-4 flex flex-col items-center justify-center text-center h-24'>
              <BookOpenIcon className='h-6 w-6 mb-2 text-primary' />
              <p className='text-sm font-medium'>View Children</p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/messages'>
          <Card className='hover:bg-accent/50 transition-colors cursor-pointer'>
            <CardContent className='p-4 flex flex-col items-center justify-center text-center h-24'>
              <MessageSquareIcon className='h-6 w-6 mb-2 text-primary' />
              <p className='text-sm font-medium'>Message Teachers</p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/fees'>
          <Card className='hover:bg-accent/50 transition-colors cursor-pointer'>
            <CardContent className='p-4 flex flex-col items-center justify-center text-center h-24'>
              <CreditCardIcon className='h-6 w-6 mb-2 text-primary' />
              <p className='text-sm font-medium'>Pay Fees</p>
            </CardContent>
          </Card>
        </Link>
        <Link href='/dashboard/calendar'>
          <Card className='hover:bg-accent/50 transition-colors cursor-pointer'>
            <CardContent className='p-4 flex flex-col items-center justify-center text-center h-24'>
              <CalendarIcon className='h-6 w-6 mb-2 text-primary' />
              <p className='text-sm font-medium'>School Calendar</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Children Overview */}
      <div className='grid gap-6 md:grid-cols-2'>
        {children.map((child) => (
          <Card key={child.id} className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center gap-4 pb-2 bg-muted/50'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={child.avatar} alt={child.name} />
                <AvatarFallback>
                  {child.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <CardTitle className='flex items-center justify-between'>
                  {child.name}
                  <Link href={`/dashboard/children?child=${child.id}`}>
                    <Button size='sm' variant='outline'>
                      View Details
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Grade {child.grade}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className='p-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Attendance</span>
                    <span className='text-sm text-muted-foreground'>
                      {child.attendance}%
                    </span>
                  </div>
                  <Progress value={child.attendance} className='h-2' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>GPA</span>
                    <span className='text-sm text-muted-foreground'>
                      {child.gpa}/4.0
                    </span>
                  </div>
                  <Progress value={child.gpa * 25} className='h-2' />
                </div>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-2'>
                <Link href={`/dashboard/children?child=${child.id}&tab=grades`}>
                  <div className='rounded-md bg-muted p-2 text-center hover:bg-accent/50 transition-colors cursor-pointer'>
                    <p className='text-xs font-medium'>Grades</p>
                  </div>
                </Link>
                <Link
                  href={`/dashboard/children?child=${child.id}&tab=attendance`}
                >
                  <div className='rounded-md bg-muted p-2 text-center hover:bg-accent/50 transition-colors cursor-pointer'>
                    <p className='text-xs font-medium'>Attendance</p>
                  </div>
                </Link>
                <Link
                  href={`/dashboard/children?child=${child.id}&tab=assignments`}
                >
                  <div className='rounded-md bg-muted p-2 text-center hover:bg-accent/50 transition-colors cursor-pointer'>
                    <p className='text-xs font-medium'>Assignments</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue='announcements'>
        <TabsList>
          <TabsTrigger value='announcements'>Announcements</TabsTrigger>
          <TabsTrigger value='events'>Upcoming Events</TabsTrigger>
          <TabsTrigger value='fees'>Fees & Payments</TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value='announcements' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>School Announcements</CardTitle>
              <CardDescription>
                Latest news and updates from the school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className='border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <h3 className='font-medium'>{announcement.title}</h3>
                      <Badge
                        variant={
                          announcement.priority === 'high'
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {announcement.priority === 'high'
                          ? 'Important'
                          : 'Announcement'}
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground mb-2'>
                      {announcement.content}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {announcement.date}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-center'>
                <Button variant='outline'>View All Announcements</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value='events' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                School events and important dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {events.map((event) => (
                  <div
                    key={event.id}
                    className='flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                      <CalendarIcon className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='font-medium'>{event.title}</p>
                      <p className='text-sm text-muted-foreground'>
                        {event.date}
                      </p>
                    </div>
                    <Badge variant='outline'>{event.type}</Badge>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-center'>
                <Button variant='outline'>View Full Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value='fees' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Fee Information</CardTitle>
              <CardDescription>
                Payment status and upcoming fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {fees.map((fee) => (
                  <div
                    key={fee.id}
                    className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        <CreditCardIcon className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <p className='font-medium'>{fee.description}</p>
                        <p className='text-sm text-muted-foreground'>
                          Due {fee.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <div className='text-sm font-medium'>${fee.amount}</div>
                      <Badge
                        variant={fee.status === 'Paid' ? 'outline' : 'default'}
                      >
                        {fee.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-center'>
                <Button>Make a Payment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
