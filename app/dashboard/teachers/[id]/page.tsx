'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useGetTeacher } from '@/apis/teachers/get-teacher';
import { getDisplayName } from '@/utils/get-display-name';
import { format } from 'date-fns';

export default function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data } = useGetTeacher(id);

  // Sample classes data
  const classes = [
    {
      id: 1,
      name: 'Algebra I',
      grade: '10A',
      students: 30,
      schedule: 'Mon, Wed, Fri 9:00 AM',
      room: 'Room 101',
    },
    {
      id: 2,
      name: 'Algebra I',
      grade: '10B',
      students: 28,
      schedule: 'Mon, Wed, Fri 10:30 AM',
      room: 'Room 101',
    },
    {
      id: 3,
      name: 'Calculus',
      grade: '12A',
      students: 25,
      schedule: 'Tue, Thu 9:00 AM',
      room: 'Room 103',
    },
    {
      id: 4,
      name: 'Geometry',
      grade: '11B',
      students: 27,
      schedule: 'Tue, Thu 11:00 AM',
      room: 'Room 102',
    },
  ];

  // Sample schedule data
  const schedule = [
    {
      day: 'Monday',
      periods: [
        {
          time: '9:00 AM - 10:20 AM',
          class: 'Algebra I (10A)',
          room: 'Room 101',
        },
        {
          time: '10:30 AM - 11:50 AM',
          class: 'Algebra I (10B)',
          room: 'Room 101',
        },
        {
          time: '1:00 PM - 2:20 PM',
          class: 'Office Hours',
          room: 'Faculty Office',
        },
      ],
    },
    {
      day: 'Tuesday',
      periods: [
        {
          time: '9:00 AM - 10:20 AM',
          class: 'Calculus (12A)',
          room: 'Room 103',
        },
        {
          time: '11:00 AM - 12:20 PM',
          class: 'Geometry (11B)',
          room: 'Room 102',
        },
        {
          time: '2:30 PM - 4:00 PM',
          class: 'Department Meeting',
          room: 'Conference Room',
        },
      ],
    },
    {
      day: 'Wednesday',
      periods: [
        {
          time: '9:00 AM - 10:20 AM',
          class: 'Algebra I (10A)',
          room: 'Room 101',
        },
        {
          time: '10:30 AM - 11:50 AM',
          class: 'Algebra I (10B)',
          room: 'Room 101',
        },
        {
          time: '1:00 PM - 3:00 PM',
          class: 'Curriculum Development',
          room: 'Faculty Office',
        },
      ],
    },
    {
      day: 'Thursday',
      periods: [
        {
          time: '9:00 AM - 10:20 AM',
          class: 'Calculus (12A)',
          room: 'Room 103',
        },
        {
          time: '11:00 AM - 12:20 PM',
          class: 'Geometry (11B)',
          room: 'Room 102',
        },
        {
          time: '1:30 PM - 3:00 PM',
          class: 'Student Tutoring',
          room: 'Library',
        },
      ],
    },
    {
      day: 'Friday',
      periods: [
        {
          time: '9:00 AM - 10:20 AM',
          class: 'Algebra I (10A)',
          room: 'Room 101',
        },
        {
          time: '10:30 AM - 11:50 AM',
          class: 'Algebra I (10B)',
          room: 'Room 101',
        },
        {
          time: '1:00 PM - 2:30 PM',
          class: 'Faculty Meeting',
          room: 'Auditorium',
        },
      ],
    },
  ];

  // Sample performance data
  const performance = [
    { metric: 'Student Pass Rate', value: 94, target: 90 },
    { metric: 'Student Satisfaction', value: 92, target: 85 },
    { metric: 'Attendance Rate', value: 98, target: 95 },
    { metric: 'Curriculum Completion', value: 88, target: 85 },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/teachers'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Teacher Profile</h1>
        </div>
        <div className='flex gap-2'>
          <Link href={`/dashboard/teachers/edit/${id}`}>
            <Button variant='outline'>Edit Profile</Button>
          </Link>
          <Button>Message</Button>
        </div>
      </div>
      {data && (
        <div className='grid gap-6 md:grid-cols-7'>
          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col items-center gap-4 text-center'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage
                    src={data.user.photoUrl ?? ''}
                    alt={getDisplayName(data)}
                  />
                  <AvatarFallback>{getDisplayName(data)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className='text-xl font-bold'>{getDisplayName(data)}</h2>
                  <p className='text-muted-foreground'>{data.departmentId}</p>
                  <Badge
                    className='mt-2'
                    variant={data.deletedAt ? 'default' : 'destructive'}
                  >
                    {data.deletedAt ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-2 gap-1 text-sm'>
                    <span className='text-muted-foreground'>
                      Qualification:
                    </span>
                    <span>DN</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-2 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Experience:</span>
                    <span>1 year</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-2 gap-1 text-sm'>
                    <span className='text-muted-foreground'>
                      Date of Birth:
                    </span>
                    <span>{format(new Date(data.dob), 'dd/MM/yyyy')}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Address:</span>
                    <span>DN</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Email:</span>
                    <span>{data.user.email}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Phone:</span>
                    <span>{data.contactNumber}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Joined:</span>
                    <span>{format(new Date(data.hireDate), 'dd/MM/yyyy')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='space-y-6 md:col-span-5'>
            <div className='grid gap-6 md:grid-cols-3'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>10A</div>
                  <p className='text-xs text-muted-foreground'>
                    Current teaching load
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>4</div>
                  <p className='text-xs text-muted-foreground'>
                    Total students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1 year</div>
                  <p className='text-xs text-muted-foreground'>
                    Teaching since {new Date(data.hireDate).getFullYear()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue='classes'>
              <TabsList>
                <TabsTrigger value='classes'>Classes</TabsTrigger>
                <TabsTrigger value='schedule'>Schedule</TabsTrigger>
                <TabsTrigger value='performance'>Performance</TabsTrigger>
                <TabsTrigger value='documents'>Documents</TabsTrigger>
              </TabsList>
              <TabsContent value='classes' className='space-y-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between'>
                    <CardTitle>Current Classes</CardTitle>
                    <Button variant='outline' size='sm'>
                      <Download className='mr-2 h-4 w-4' />
                      Export
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class Name</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Room</TableHead>
                          <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {classes.map((cls) => (
                          <TableRow key={cls.id}>
                            <TableCell className='font-medium'>
                              {cls.name}
                            </TableCell>
                            <TableCell>{cls.grade}</TableCell>
                            <TableCell>{cls.students}</TableCell>
                            <TableCell>{cls.schedule}</TableCell>
                            <TableCell>{cls.room}</TableCell>
                            <TableCell className='text-right'>
                              <Button variant='ghost' size='sm'>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='schedule' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      Current teaching and administrative schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {schedule.map((day) => (
                        <div key={day.day} className='space-y-2'>
                          <h3 className='font-medium'>{day.day}</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Class/Activity</TableHead>
                                <TableHead>Location</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {day.periods.map((period, index) => (
                                <TableRow key={index}>
                                  <TableCell>{period.time}</TableCell>
                                  <TableCell>{period.class}</TableCell>
                                  <TableCell>{period.room}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='performance' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>
                      Teacher performance based on key metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {performance.map((item, index) => (
                        <div key={index} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <span className='font-medium'>{item.metric}</span>
                            <span className='text-sm text-muted-foreground'>
                              Target: {item.target}%
                            </span>
                          </div>
                          <div className='space-y-1'>
                            <Progress value={item.value} className='h-2' />
                            <div className='flex justify-between text-sm text-muted-foreground'>
                              <span>{item.value}%</span>
                              <span
                                className={
                                  item.value >= item.target
                                    ? 'text-green-500'
                                    : 'text-amber-500'
                                }
                              >
                                {item.value >= item.target
                                  ? `+${item.value - item.target}%`
                                  : `-${item.target - item.value}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='documents' className='space-y-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Teacher Documents</CardTitle>
                    <CardDescription>
                      Important documents related to this teacher
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between border-b pb-4'>
                        <div className='flex items-center gap-3'>
                          <BookOpen className='h-5 w-5 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>Employment Contract</p>
                            <p className='text-sm text-muted-foreground'>
                              Uploaded on Sep 1, 2010
                            </p>
                          </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </Button>
                      </div>
                      <div className='flex items-center justify-between border-b pb-4'>
                        <div className='flex items-center gap-3'>
                          <BookOpen className='h-5 w-5 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>Academic Credentials</p>
                            <p className='text-sm text-muted-foreground'>
                              Uploaded on Sep 5, 2010
                            </p>
                          </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </Button>
                      </div>
                      <div className='flex items-center justify-between border-b pb-4'>
                        <div className='flex items-center gap-3'>
                          <BookOpen className='h-5 w-5 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>
                              Teaching Certifications
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Uploaded on Sep 10, 2010
                            </p>
                          </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </Button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <BookOpen className='h-5 w-5 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>
                              Performance Evaluations
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Uploaded on Jan 15, 2025
                            </p>
                          </div>
                        </div>
                        <Button variant='ghost' size='sm'>
                          <Download className='mr-2 h-4 w-4' />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
