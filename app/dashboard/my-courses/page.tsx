'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, FileText, MapPin, Search } from 'lucide-react';

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      code: 'MATH101',
      name: 'Algebra I',
      teacher: 'Dr. Robert Chen',
      schedule: 'Mon, Wed, Fri 9:00 AM - 10:30 AM',
      location: 'Room 201',
      progress: 65,
      grade: 'A-',
      assignments: 5,
      pendingAssignments: 2,
      image: '/placeholder.svg?height=100&width=200',
    },
    {
      id: 2,
      code: 'ENG203',
      name: 'English Literature',
      teacher: 'Sarah Johnson',
      schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
      location: 'Room 105',
      progress: 72,
      grade: 'B+',
      assignments: 6,
      pendingAssignments: 1,
      image: '/placeholder.svg?height=100&width=200',
    },
    {
      id: 3,
      code: 'SCI105',
      name: 'Biology',
      teacher: 'Michael Williams',
      schedule: 'Mon, Wed 1:00 PM - 2:30 PM',
      location: 'Lab 3',
      progress: 58,
      grade: 'B',
      assignments: 7,
      pendingAssignments: 3,
      image: '/placeholder.svg?height=100&width=200',
    },
    {
      id: 4,
      code: 'HIST202',
      name: 'World History',
      teacher: 'Emily Davis',
      schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
      location: 'Room 302',
      progress: 45,
      grade: 'A',
      assignments: 4,
      pendingAssignments: 1,
      image: '/placeholder.svg?height=100&width=200',
    },
    {
      id: 5,
      code: 'CS101',
      name: 'Computer Science Fundamentals',
      teacher: 'David Martinez',
      schedule: 'Tue, Thu 9:00 AM - 10:30 AM',
      location: 'Computer Lab 2',
      progress: 80,
      grade: 'A+',
      assignments: 8,
      pendingAssignments: 0,
      image: '/placeholder.svg?height=100&width=200',
    },
    {
      id: 6,
      code: 'MUS120',
      name: 'Music Theory',
      teacher: 'Lisa Anderson',
      schedule: 'Wed, Fri 11:00 AM - 12:30 PM',
      location: 'Music Room',
      progress: 50,
      grade: 'B-',
      assignments: 3,
      pendingAssignments: 2,
      image: '/placeholder.svg?height=100&width=200',
    },
  ];

  // Filter courses based on search query
  const filteredCourses = enrolledCourses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate stats
  const totalCourses = enrolledCourses.length;
  const totalAssignments = enrolledCourses.reduce(
    (acc, course) => acc + course.assignments,
    0,
  );
  const pendingAssignments = enrolledCourses.reduce(
    (acc, course) => acc + course.pendingAssignments,
    0,
  );
  const averageProgress = Math.round(
    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) /
      totalCourses,
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Courses</h1>
          <p className='text-muted-foreground'>
            View and manage your enrolled courses.
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Courses</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Assignments
            </CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalAssignments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Assignments
            </CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingAssignments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Progress
            </CardTitle>
            <Progress value={averageProgress} className='h-2 w-[60px]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{averageProgress}%</div>
          </CardContent>
        </Card>
      </div>

      <div className='flex items-center justify-between'>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search courses...'
            className='w-full pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue='grid' className='ml-auto'>
          <TabsList className='grid w-[120px] grid-cols-2'>
            <TabsTrigger value='grid'>Grid</TabsTrigger>
            <TabsTrigger value='list'>List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value='grid' className='mt-0'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredCourses.length === 0 ? (
            <div className='col-span-full text-center py-6'>
              <p className='text-muted-foreground'>No courses found.</p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className='overflow-hidden'>
                <div className='aspect-video w-full overflow-hidden'>
                  <img
                    src={course.image || '/placeholder.svg'}
                    alt={course.name}
                    className='h-full w-full object-cover transition-all hover:scale-105'
                  />
                </div>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <Badge variant='outline'>{course.code}</Badge>
                    <Badge>{course.grade}</Badge>
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.teacher}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <Calendar className='mr-1 h-4 w-4' />
                      <span>{course.schedule}</span>
                    </div>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <MapPin className='mr-1 h-4 w-4' />
                      <span>{course.location}</span>
                    </div>
                    <div className='pt-2'>
                      <div className='flex items-center justify-between text-sm'>
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className='h-2 mt-1' />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button variant='outline' size='sm'>
                    <FileText className='mr-2 h-4 w-4' />
                    Materials
                  </Button>
                  <Link href={`/dashboard/my-courses/${course.id}`}>
                    <Button size='sm'>View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value='list' className='mt-0'>
        <Card>
          <CardContent className='p-0'>
            <div className='rounded-md border'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/50'>
                    <th className='py-3 px-4 text-left font-medium'>Course</th>
                    <th className='py-3 px-4 text-left font-medium hidden md:table-cell'>
                      Teacher
                    </th>
                    <th className='py-3 px-4 text-left font-medium hidden lg:table-cell'>
                      Schedule
                    </th>
                    <th className='py-3 px-4 text-left font-medium'>
                      Progress
                    </th>
                    <th className='py-3 px-4 text-left font-medium'>Grade</th>
                    <th className='py-3 px-4 text-right font-medium'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className='py-6 text-center text-muted-foreground'
                      >
                        No courses found.
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr key={course.id} className='border-b'>
                        <td className='py-3 px-4'>
                          <div>
                            <div className='font-medium'>{course.name}</div>
                            <div className='text-sm text-muted-foreground'>
                              {course.code}
                            </div>
                          </div>
                        </td>
                        <td className='py-3 px-4 hidden md:table-cell'>
                          {course.teacher}
                        </td>
                        <td className='py-3 px-4 hidden lg:table-cell'>
                          {course.schedule}
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
                            <Progress
                              value={course.progress}
                              className='h-2 w-[60px]'
                            />
                            <span className='text-sm'>{course.progress}%</span>
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <Badge>{course.grade}</Badge>
                        </td>
                        <td className='py-3 px-4 text-right'>
                          <Link href={`/dashboard/my-courses/${course.id}`}>
                            <Button variant='ghost' size='sm'>
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
