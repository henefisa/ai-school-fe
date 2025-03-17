'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import {
  Calendar,
  MessageSquare,
  Search,
  User,
  FileText,
  Clock,
} from 'lucide-react';

export default function ChildrenPage() {
  const searchParams = useSearchParams();
  const childIdParam = searchParams.get('child');
  const tabParam = searchParams.get('tab');

  const [selectedChild, setSelectedChild] = useState<number>(
    childIdParam ? Number.parseInt(childIdParam) : 1
  );
  const [activeTab, setActiveTab] = useState<string>(tabParam || 'grades');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (childIdParam) {
      setSelectedChild(Number.parseInt(childIdParam));
    }
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [childIdParam, tabParam]);

  // Sample children data
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '10A',
      avatar: '/placeholder.svg',
      teacher: 'Dr. Robert Chen',
      attendance: { present: 98, absent: 2, late: 0 },
      gpa: 3.8,
      recentActivity: {
        newGrades: 2,
        upcomingAssignments: 3,
      },
      teachers: [
        {
          name: 'Dr. Robert Chen',
          subject: 'Mathematics',
          email: 'robert.chen@school.edu',
        },
        {
          name: 'Sarah Johnson',
          subject: 'English Literature',
          email: 'sarah.johnson@school.edu',
        },
        {
          name: 'Michael Williams',
          subject: 'Biology',
          email: 'michael.williams@school.edu',
        },
        {
          name: 'Emily Davis',
          subject: 'World History',
          email: 'emily.davis@school.edu',
        },
        {
          name: 'David Martinez',
          subject: 'Computer Science',
          email: 'david.martinez@school.edu',
        },
      ],
    },
    {
      id: 2,
      name: 'Noah Johnson',
      grade: '7B',
      avatar: '/placeholder.svg',
      teacher: 'Sarah Johnson',
      attendance: { present: 95, absent: 3, late: 2 },
      gpa: 3.5,
      recentActivity: {
        newGrades: 1,
        upcomingAssignments: 2,
      },
      teachers: [
        {
          name: 'Sarah Johnson',
          subject: 'English Literature',
          email: 'sarah.johnson@school.edu',
        },
        {
          name: 'James Wilson',
          subject: 'Mathematics',
          email: 'james.wilson@school.edu',
        },
        {
          name: 'Jennifer Brown',
          subject: 'Science',
          email: 'jennifer.brown@school.edu',
        },
        {
          name: 'Thomas Anderson',
          subject: 'History',
          email: 'thomas.anderson@school.edu',
        },
        {
          name: 'Lisa Garcia',
          subject: 'Art',
          email: 'lisa.garcia@school.edu',
        },
      ],
    },
  ];

  // Sample grades data
  const grades = [
    {
      subject: 'Mathematics',
      currentGrade: 'A',
      teacher: 'Dr. Robert Chen',
      lastUpdated: 'Mar 15, 2025',
    },
    {
      subject: 'English Literature',
      currentGrade: 'A-',
      teacher: 'Sarah Johnson',
      lastUpdated: 'Mar 12, 2025',
    },
    {
      subject: 'Biology',
      currentGrade: 'B+',
      teacher: 'Michael Williams',
      lastUpdated: 'Mar 10, 2025',
    },
    {
      subject: 'World History',
      currentGrade: 'A',
      teacher: 'Emily Davis',
      lastUpdated: 'Mar 8, 2025',
    },
    {
      subject: 'Computer Science',
      currentGrade: 'A+',
      teacher: 'David Martinez',
      lastUpdated: 'Mar 5, 2025',
    },
  ];

  // Sample detailed grades data
  const detailedGrades = [
    {
      subject: 'Mathematics',
      assignments: [
        {
          name: 'Algebra Quiz 1',
          score: 92,
          maxScore: 100,
          weight: '10%',
          date: 'Feb 10, 2025',
        },
        {
          name: 'Algebra Assignment 1',
          score: 88,
          maxScore: 100,
          weight: '15%',
          date: 'Feb 15, 2025',
        },
        {
          name: 'Algebra Midterm',
          score: 90,
          maxScore: 100,
          weight: '30%',
          date: 'Mar 1, 2025',
        },
      ],
      average: 90,
      grade: 'A',
    },
    {
      subject: 'English Literature',
      assignments: [
        {
          name: 'Essay on Shakespeare',
          score: 85,
          maxScore: 100,
          weight: '20%',
          date: 'Feb 12, 2025',
        },
        {
          name: 'Reading Comprehension',
          score: 88,
          maxScore: 100,
          weight: '15%',
          date: 'Feb 20, 2025',
        },
        {
          name: 'Literature Analysis',
          score: 92,
          maxScore: 100,
          weight: '25%',
          date: 'Mar 5, 2025',
        },
      ],
      average: 88.5,
      grade: 'A-',
    },
    {
      subject: 'Biology',
      assignments: [
        {
          name: 'Cell Structure Quiz',
          score: 85,
          maxScore: 100,
          weight: '10%',
          date: 'Feb 8, 2025',
        },
        {
          name: 'Lab Report: Photosynthesis',
          score: 88,
          maxScore: 100,
          weight: '20%',
          date: 'Feb 18, 2025',
        },
        {
          name: 'Biology Midterm',
          score: 82,
          maxScore: 100,
          weight: '30%',
          date: 'Mar 3, 2025',
        },
      ],
      average: 84.3,
      grade: 'B+',
    },
  ];

  // Sample attendance data
  const attendanceData = [
    { date: '2025-03-15', status: 'Present' },
    { date: '2025-03-14', status: 'Present' },
    { date: '2025-03-13', status: 'Present' },
    { date: '2025-03-12', status: 'Absent', reason: 'Sick' },
    { date: '2025-03-11', status: 'Present' },
    { date: '2025-03-10', status: 'Present' },
    { date: '2025-03-09', status: 'Present' },
    { date: '2025-03-08', status: 'Present' },
    { date: '2025-03-07', status: 'Late', reason: 'Traffic' },
    { date: '2025-03-06', status: 'Present' },
  ];

  // Sample assignments data
  const assignments = [
    {
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      dueDate: '2025-03-20',
      status: 'Pending',
      description: 'Complete problems 1-20 on page 45 of the textbook.',
      teacher: 'Dr. Robert Chen',
    },
    {
      title: 'Essay on Shakespeare',
      subject: 'English Literature',
      dueDate: '2025-03-22',
      status: 'Submitted',
      description: 'Write a 1000-word essay analyzing the themes in Hamlet.',
      teacher: 'Sarah Johnson',
    },
    {
      title: 'Lab Report: Photosynthesis',
      subject: 'Biology',
      dueDate: '2025-03-18',
      status: 'Graded',
      grade: 'A-',
      description:
        'Write a lab report on the photosynthesis experiment conducted in class.',
      teacher: 'Michael Williams',
    },
    {
      title: 'World War II Research',
      subject: 'World History',
      dueDate: '2025-03-25',
      status: 'Pending',
      description: 'Research and present on a specific aspect of World War II.',
      teacher: 'Emily Davis',
    },
  ];

  // Sample events data
  const events = [
    { title: 'Math Quiz', date: '2025-03-20', type: 'Academic' },
    { title: 'Science Fair', date: '2025-04-05', type: 'Event' },
    { title: 'Parent-Teacher Meeting', date: '2025-03-25', type: 'Meeting' },
  ];

  const selectedChildData = children.find(
    (child) => child.id === selectedChild
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-12'>
        {/* Children List Sidebar */}
        <div className='md:col-span-4 lg:col-span-3'>
          <Card>
            <CardHeader>
              <CardTitle>Children</CardTitle>
              <CardDescription>Select a child to view details</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {children.map((child) => (
                <div
                  key={child.id}
                  className={`flex items-center gap-4 p-3 rounded-md cursor-pointer hover:bg-muted ${
                    selectedChild === child.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedChild(child.id)}
                >
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>
                      {child.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <p className='font-medium'>{child.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      Grade {child.grade}
                    </p>
                  </div>
                  <div className='flex flex-col items-end text-xs'>
                    {child.recentActivity.newGrades > 0 && (
                      <Badge variant='secondary' className='mb-1'>
                        {child.recentActivity.newGrades} new grades
                      </Badge>
                    )}
                    {child.recentActivity.upcomingAssignments > 0 && (
                      <Badge variant='outline'>
                        {child.recentActivity.upcomingAssignments} assignments
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Child Details */}
        <div className='md:col-span-8 lg:col-span-9'>
          {selectedChildData && (
            <div className='space-y-6'>
              {/* Child Overview */}
              <Card>
                <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage
                      src={selectedChildData.avatar}
                      alt={selectedChildData.name}
                    />
                    <AvatarFallback>
                      {selectedChildData.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <CardTitle>{selectedChildData.name}</CardTitle>
                      <Button variant='outline' size='sm'>
                        <MessageSquare className='mr-2 h-4 w-4' />
                        Message Teacher
                      </Button>
                    </div>
                    <CardDescription>
                      Grade {selectedChildData.grade} • Teacher:{' '}
                      {selectedChildData.teacher}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-3'>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>GPA</span>
                        <span className='text-sm text-muted-foreground'>
                          {selectedChildData.gpa}/4.0
                        </span>
                      </div>
                      <Progress
                        value={selectedChildData.gpa * 25}
                        className='h-2'
                      />
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>Attendance</span>
                        <span className='text-sm text-muted-foreground'>
                          {selectedChildData.attendance.present}%
                        </span>
                      </div>
                      <Progress
                        value={selectedChildData.attendance.present}
                        className='h-2'
                      />
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>Upcoming</span>
                        <span className='text-sm text-muted-foreground'>
                          {selectedChildData.recentActivity.upcomingAssignments}{' '}
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

              {/* Detailed Information Tabs */}
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value='grades'>Grades</TabsTrigger>
                  <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                  <TabsTrigger value='assignments'>Assignments</TabsTrigger>
                  <TabsTrigger value='calendar'>Calendar</TabsTrigger>
                  <TabsTrigger value='teachers'>Teachers</TabsTrigger>
                </TabsList>

                {/* Grades Tab */}
                <TabsContent value='grades' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Grades</CardTitle>
                      <CardDescription>
                        Academic performance across all subjects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Current Grade</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className='text-right'>
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {grades.map((grade, index) => (
                            <TableRow key={index}>
                              <TableCell className='font-medium'>
                                {grade.subject}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    grade.currentGrade.startsWith('A')
                                      ? 'default'
                                      : grade.currentGrade.startsWith('B')
                                      ? 'secondary'
                                      : 'outline'
                                  }
                                >
                                  {grade.currentGrade}
                                </Badge>
                              </TableCell>
                              <TableCell>{grade.teacher}</TableCell>
                              <TableCell>{grade.lastUpdated}</TableCell>
                              <TableCell className='text-right'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => {
                                    document
                                      .getElementById(`grade-details-${index}`)
                                      ?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Detailed Grade Breakdown */}
                      <div className='mt-8 space-y-6'>
                        <h3 className='text-lg font-semibold'>
                          Detailed Grade Breakdown
                        </h3>
                        {detailedGrades.map((subject, index) => (
                          <div
                            key={index}
                            id={`grade-details-${index}`}
                            className='border rounded-lg p-4'
                          >
                            <div className='flex items-center justify-between mb-4'>
                              <div>
                                <h4 className='text-md font-medium'>
                                  {subject.subject}
                                </h4>
                                <p className='text-sm text-muted-foreground'>
                                  Current Grade: {subject.grade} (
                                  {subject.average}%)
                                </p>
                              </div>
                              <Badge
                                variant={
                                  subject.grade.startsWith('A')
                                    ? 'default'
                                    : subject.grade.startsWith('B')
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {subject.grade}
                              </Badge>
                            </div>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Assignment</TableHead>
                                  <TableHead>Score</TableHead>
                                  <TableHead>Weight</TableHead>
                                  <TableHead>Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subject.assignments.map((assignment, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className='font-medium'>
                                      {assignment.name}
                                    </TableCell>
                                    <TableCell>
                                      {assignment.score}/{assignment.maxScore} (
                                      {Math.round(
                                        (assignment.score /
                                          assignment.maxScore) *
                                          100
                                      )}
                                      %)
                                    </TableCell>
                                    <TableCell>{assignment.weight}</TableCell>
                                    <TableCell>{assignment.date}</TableCell>
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

                {/* Attendance Tab */}
                <TabsContent value='attendance' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Record</CardTitle>
                      <CardDescription>
                        Recent attendance history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='grid gap-6 md:grid-cols-3 mb-6'>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>
                              Present
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold text-green-600'>
                              {selectedChildData.attendance.present}%
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {selectedChildData.attendance.present} days
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>
                              Absent
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold text-red-600'>
                              {selectedChildData.attendance.absent}%
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {selectedChildData.attendance.absent} days
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className='pb-2'>
                            <CardTitle className='text-sm font-medium'>
                              Late
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className='text-2xl font-bold text-amber-600'>
                              {selectedChildData.attendance.late}%
                            </div>
                            <p className='text-xs text-muted-foreground'>
                              {selectedChildData.attendance.late} days
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Reason (if applicable)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {attendanceData.map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {new Date(record.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    record.status === 'Present'
                                      ? 'outline'
                                      : record.status === 'Absent'
                                      ? 'destructive'
                                      : 'secondary'
                                  }
                                >
                                  {record.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{record.reason || '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value='assignments' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Assignments</CardTitle>
                      <CardDescription>
                        Current and upcoming assignments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='text-right'>
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignments.map((assignment, index) => (
                            <TableRow key={index}>
                              <TableCell className='font-medium'>
                                {assignment.title}
                              </TableCell>
                              <TableCell>{assignment.subject}</TableCell>
                              <TableCell>
                                {new Date(
                                  assignment.dueDate
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    assignment.status === 'Pending'
                                      ? 'default'
                                      : assignment.status === 'Submitted'
                                      ? 'secondary'
                                      : 'outline'
                                  }
                                >
                                  {assignment.status}
                                  {assignment.grade && ` (${assignment.grade})`}
                                </Badge>
                              </TableCell>
                              <TableCell className='text-right'>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  onClick={() => {
                                    document
                                      .getElementById(
                                        `assignment-details-${index}`
                                      )
                                      ?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {/* Assignment Details */}
                      <div className='mt-8 space-y-6'>
                        <h3 className='text-lg font-semibold'>
                          Assignment Details
                        </h3>
                        {assignments.map((assignment, index) => (
                          <div
                            key={index}
                            id={`assignment-details-${index}`}
                            className='border rounded-lg p-4'
                          >
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='text-md font-medium'>
                                {assignment.title}
                              </h4>
                              <Badge
                                variant={
                                  assignment.status === 'Pending'
                                    ? 'default'
                                    : assignment.status === 'Submitted'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {assignment.status}
                                {assignment.grade && ` (${assignment.grade})`}
                              </Badge>
                            </div>
                            <div className='grid gap-2 md:grid-cols-3 mb-4 text-sm'>
                              <div>
                                <span className='font-medium'>Subject:</span>{' '}
                                {assignment.subject}
                              </div>
                              <div>
                                <span className='font-medium'>Due Date:</span>{' '}
                                {new Date(
                                  assignment.dueDate
                                ).toLocaleDateString()}
                              </div>
                              <div>
                                <span className='font-medium'>Teacher:</span>{' '}
                                {assignment.teacher}
                              </div>
                            </div>
                            <div className='mb-4'>
                              <h5 className='text-sm font-medium mb-1'>
                                Description:
                              </h5>
                              <p className='text-sm text-muted-foreground'>
                                {assignment.description}
                              </p>
                            </div>
                            <div className='flex justify-end gap-2'>
                              <Button variant='outline' size='sm'>
                                <FileText className='mr-2 h-4 w-4' />
                                View Assignment
                              </Button>
                              {assignment.status === 'Pending' && (
                                <Button size='sm'>
                                  <Clock className='mr-2 h-4 w-4' />
                                  Set Reminder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Calendar Tab */}
                <TabsContent value='calendar' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>School Calendar</CardTitle>
                      <CardDescription>
                        Upcoming events and important dates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {events.map((event, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0'
                          >
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                              <Calendar className='h-5 w-5 text-primary' />
                            </div>
                            <div className='flex-1'>
                              <p className='font-medium'>{event.title}</p>
                              <p className='text-sm text-muted-foreground'>
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant='outline'>{event.type}</Badge>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 border rounded-lg p-4 text-center'>
                        <p className='text-muted-foreground mb-4'>
                          View the full school calendar for more events and
                          important dates
                        </p>
                        <Button>
                          <Calendar className='mr-2 h-4 w-4' />
                          View Full Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Teachers Tab */}
                <TabsContent value='teachers' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Teachers</CardTitle>
                      <CardDescription>
                        Contact information for your child's teachers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {selectedChildData.teachers.map((teacher, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                          >
                            <div className='flex items-center gap-4'>
                              <Avatar className='h-10 w-10'>
                                <AvatarFallback>
                                  {teacher.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className='font-medium'>{teacher.name}</p>
                                <p className='text-sm text-muted-foreground'>
                                  {teacher.subject}
                                </p>
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              <Button variant='outline' size='sm'>
                                <MessageSquare className='mr-2 h-4 w-4' />
                                Message
                              </Button>
                              <Button variant='ghost' size='sm'>
                                View Profile
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
