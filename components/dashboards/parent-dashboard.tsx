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
import {
  CalendarIcon,
  CreditCardIcon,
  BellIcon,
  MessageSquareIcon,
} from 'lucide-react';

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

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Parent Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here&apos;s an overview of your children&apos;s
          progress.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader className='flex flex-row items-center gap-4 pb-2'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={child.avatar} alt={child.name} />
                <AvatarFallback>
                  {child.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>Grade {child.grade}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='academics'>Academics</TabsTrigger>
          <TabsTrigger value='fees'>Fees</TabsTrigger>
          <TabsTrigger value='communication'>Communication</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Stay updated with the latest announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/20'>
                      <BellIcon className='h-4 w-4 text-primary' />
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>
                        {
                          [
                            "Emma's Math test scheduled for next week",
                            'School holiday announced for March 25',
                            "Noah's Science project due date extended",
                          ][i - 1]
                        }
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {['1 hour ago', 'Yesterday', '2 days ago'][i - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='academics' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>
                Your children's grades and performance
              </CardDescription>
            </CardHeader>
            <CardContent className='h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg'>
              <p className='text-muted-foreground'>
                Detailed academic reports will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='communication' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Messages from Teachers</CardTitle>
              <CardDescription>Recent communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className='flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                      <MessageSquareIcon className='h-5 w-5 text-primary' />
                    </div>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>
                          {
                            [
                              'Dr. Robert Chen (Math)',
                              'Sarah Johnson (English)',
                              'Michael Williams (Science)',
                            ][i - 1]
                          }
                        </p>
                        <Badge variant='outline' className='text-xs'>
                          {['Emma', 'Noah', 'Emma'][i - 1]}
                        </Badge>
                      </div>
                      <p className='text-sm'>
                        {
                          [
                            'Emma has been doing great in class. I wanted to discuss her upcoming project.',
                            "Noah's recent essay showed significant improvement. I'm very pleased with his progress.",
                            "Emma's science fair project is coming along well. Please ensure she completes the final section.",
                          ][i - 1]
                        }
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {['2 hours ago', 'Yesterday', '3 days ago'][i - 1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
