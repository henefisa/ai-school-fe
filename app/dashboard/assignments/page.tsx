'use client';

import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Clock,
  Download,
  Filter,
  PlusCircle,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export default function AssignmentsPage() {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample classes
  const classes = [
    { id: '10A', name: 'Class 10A' },
    { id: '10B', name: 'Class 10B' },
    { id: '11A', name: 'Class 11A' },
    { id: '11B', name: 'Class 11B' },
  ];

  // Sample assignments
  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Practice',
      class: '10A',
      course: 'Algebra I',
      dueDate: '2025-03-25',
      status: 'active',
      submissions: 15,
      totalStudents: 30,
    },
    {
      id: 2,
      title: 'Literary Analysis Essay',
      class: '11B',
      course: 'English Literature',
      dueDate: '2025-03-20',
      status: 'active',
      submissions: 8,
      totalStudents: 28,
    },
    {
      id: 3,
      title: 'Cell Structure Diagram',
      class: '10A',
      course: 'Biology',
      dueDate: '2025-03-15',
      status: 'closed',
      submissions: 27,
      totalStudents: 30,
    },
    {
      id: 4,
      title: 'World War II Research Paper',
      class: '11A',
      course: 'World History',
      dueDate: '2025-03-30',
      status: 'active',
      submissions: 0,
      totalStudents: 25,
    },
    {
      id: 5,
      title: 'Programming Fundamentals Quiz',
      class: '10B',
      course: 'Computer Science',
      dueDate: '2025-03-18',
      status: 'closed',
      submissions: 22,
      totalStudents: 22,
    },
  ];

  // Filter assignments based on selected filters
  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedClass !== 'all' && assignment.class !== selectedClass)
      return false;
    if (selectedStatus !== 'all' && assignment.status !== selectedStatus)
      return false;
    if (
      selectedDate &&
      format(new Date(assignment.dueDate), 'yyyy-MM-dd') !==
        format(selectedDate, 'yyyy-MM-dd')
    )
      return false;
    return true;
  });

  // Calculate statistics
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(
    (a) => a.status === 'active',
  ).length;
  const closedAssignments = assignments.filter(
    (a) => a.status === 'closed',
  ).length;
  const pendingGrading = assignments.reduce(
    (acc, curr) => acc + (curr.submissions - 0),
    0,
  ); // Assuming 0 graded for simplicity

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Assignments</h1>
          <p className='text-muted-foreground'>
            Create and manage assignments for your classes.
          </p>
        </div>
        <div className='flex gap-2'>
          <Link href='/dashboard/assignments/create'>
            <Button>
              <PlusCircle className='mr-2 h-4 w-4' />
              Create Assignment
            </Button>
          </Link>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalAssignments}</div>
            <p className='text-xs text-muted-foreground'>Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{activeAssignments}</div>
            <p className='text-xs text-muted-foreground'>
              Currently open for submission
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Closed Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{closedAssignments}</div>
            <p className='text-xs text-muted-foreground'>Past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Grading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingGrading}</div>
            <p className='text-xs text-muted-foreground'>
              Submissions to review
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all'>All Assignments</TabsTrigger>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='closed'>Closed</TabsTrigger>
          <TabsTrigger value='grading'>Pending Grading</TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>
                  View and manage all your assignments
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search assignments...'
                    className='w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]'
                  />
                </div>
                <Button variant='outline' size='icon'>
                  <Filter className='h-4 w-4' />
                  <span className='sr-only'>Filter</span>
                </Button>
                <Button variant='outline' size='icon'>
                  <SlidersHorizontal className='h-4 w-4' />
                  <span className='sr-only'>Settings</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-4 mb-6'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium'>Class</label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='All Classes' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium'>Status</label>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='All Statuses' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Statuses</SelectItem>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='closed'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium'>Due Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-[180px] justify-start text-left font-normal'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {selectedDate ? (
                          format(selectedDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={selectedDate || undefined}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {(selectedClass !== 'all' ||
                  selectedStatus !== 'all' ||
                  selectedDate) && (
                  <div className='flex items-end'>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setSelectedClass('all');
                        setSelectedStatus('all');
                        setSelectedDate(null);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className='text-center py-8'>
                        <div className='flex flex-col items-center justify-center'>
                          <Clock className='h-12 w-12 text-muted-foreground mb-4' />
                          <p className='text-muted-foreground'>
                            No assignments found
                          </p>
                          {(selectedClass ||
                            selectedStatus ||
                            selectedDate) && (
                            <p className='text-sm text-muted-foreground mt-1'>
                              Try adjusting your filters
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className='font-medium'>
                          {assignment.title}
                        </TableCell>
                        <TableCell>{assignment.class}</TableCell>
                        <TableCell>{assignment.course}</TableCell>
                        <TableCell>
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.status === 'active'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {assignment.status === 'active'
                              ? 'Active'
                              : 'Closed'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {assignment.submissions}/{assignment.totalStudents}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Link
                              href={`/dashboard/assignments/${assignment.id}`}
                            >
                              <Button variant='ghost' size='sm'>
                                View
                              </Button>
                            </Link>
                            <Link
                              href={`/dashboard/assignments/${assignment.id}/submissions`}
                            >
                              <Button variant='ghost' size='sm'>
                                Submissions
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='active' className='space-y-4'>
          {/* Similar content as "all" tab but filtered for active assignments */}
        </TabsContent>

        <TabsContent value='closed' className='space-y-4'>
          {/* Similar content as "all" tab but filtered for closed assignments */}
        </TabsContent>

        <TabsContent value='grading' className='space-y-4'>
          {/* Similar content as "all" tab but filtered for assignments with pending grading */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
