'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export default function AssignmentSubmissionsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Sample assignment data
  const assignment = {
    id: params.id,
    title: 'Quadratic Equations Practice',
    course: { id: 1, name: 'Algebra I', grade: '10A' },
    dueDate: '2025-03-25',
    maxPoints: 100,
  };

  // Sample submissions data
  const submissions = [
    {
      id: 1,
      student: { id: 1, name: 'Emma Johnson', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-24T14:30:00',
      status: 'graded',
      grade: 95,
      late: false,
      feedback: 'Excellent work! All problems solved correctly.',
    },
    {
      id: 2,
      student: { id: 2, name: 'Liam Smith', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-23T16:45:00',
      status: 'graded',
      grade: 82,
      late: false,
      feedback: 'Good work, but some minor errors in problem 3.',
    },
    {
      id: 3,
      student: { id: 3, name: 'Olivia Brown', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-25T09:15:00',
      status: 'graded',
      grade: 90,
      late: false,
      feedback: 'Very good work. Clear explanations.',
    },
    {
      id: 4,
      student: { id: 4, name: 'Noah Davis', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-26T10:30:00',
      status: 'graded',
      grade: 75,
      late: true,
      feedback: 'Late submission. Several errors in the solutions.',
    },
    {
      id: 5,
      student: { id: 5, name: 'Sophia Wilson', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-24T11:20:00',
      status: 'graded',
      grade: 88,
      late: false,
      feedback: 'Good work overall.',
    },
    {
      id: 6,
      student: { id: 6, name: 'Jackson Miller', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-25T08:45:00',
      status: 'submitted',
      grade: null,
      late: false,
      feedback: '',
    },
    {
      id: 7,
      student: { id: 7, name: 'Ava Moore', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-24T15:10:00',
      status: 'submitted',
      grade: null,
      late: false,
      feedback: '',
    },
    {
      id: 8,
      student: { id: 8, name: 'Lucas Taylor', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-26T14:20:00',
      status: 'submitted',
      grade: null,
      late: true,
      feedback: '',
    },
    {
      id: 9,
      student: { id: 9, name: 'Mia Anderson', avatar: '/placeholder.svg' },
      submittedAt: '2025-03-25T16:30:00',
      status: 'submitted',
      grade: null,
      late: false,
      feedback: '',
    },
    {
      id: 10,
      student: { id: 10, name: 'Ethan Thomas', avatar: '/placeholder.svg' },
      status: 'not-submitted',
      submittedAt: null,
      grade: null,
      late: false,
      feedback: '',
    },
  ];

  // Filter submissions based on selected status
  const filteredSubmissions =
    selectedStatus !== 'all'
      ? submissions.filter((submission) => submission.status === selectedStatus)
      : submissions;

  // Calculate statistics
  const totalSubmissions = submissions.filter(
    (s) => s.status !== 'not-submitted',
  ).length;
  const gradedSubmissions = submissions.filter(
    (s) => s.status === 'graded',
  ).length;
  const pendingSubmissions = submissions.filter(
    (s) => s.status === 'submitted',
  ).length;
  const notSubmitted = submissions.filter(
    (s) => s.status === 'not-submitted',
  ).length;
  const averageGrade =
    submissions
      .filter((s) => s.grade !== null)
      .reduce((acc, curr) => acc + (curr.grade || 0), 0) / gradedSubmissions;

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href={`/dashboard/assignments/${params.id}`}>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Submissions</h1>
            <p className='text-muted-foreground'>
              {assignment.title} • {assignment.course.name}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export Grades
          </Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalSubmissions}</div>
            <p className='text-xs text-muted-foreground'>
              {((totalSubmissions / submissions.length) * 100).toFixed(0)}% of
              students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Graded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              {gradedSubmissions}
            </div>
            <p className='text-xs text-muted-foreground'>
              {((gradedSubmissions / totalSubmissions) * 100).toFixed(0)}% of
              submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-amber-600'>
              {pendingSubmissions}
            </div>
            <p className='text-xs text-muted-foreground'>
              {((pendingSubmissions / totalSubmissions) * 100).toFixed(0)}% of
              submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Not Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              {notSubmitted}
            </div>
            <p className='text-xs text-muted-foreground'>
              {((notSubmitted / submissions.length) * 100).toFixed(0)}% of
              students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{averageGrade.toFixed(1)}</div>
            <p className='text-xs text-muted-foreground'>
              Out of {assignment.maxPoints} points
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>
              Review and grade student submissions
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search students...'
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
              <label className='text-sm font-medium'>Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='All Statuses' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Statuses</SelectItem>
                  <SelectItem value='graded'>Graded</SelectItem>
                  <SelectItem value='submitted'>Submitted</SelectItem>
                  <SelectItem value='not-submitted'>Not Submitted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedStatus !== 'all' && (
              <div className='flex items-end'>
                <Button
                  variant='ghost'
                  onClick={() => setSelectedStatus('all')}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={submission.student.avatar}
                          alt={submission.student.name}
                        />
                        <AvatarFallback>
                          {submission.student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className='font-medium'>
                        {submission.student.name}
                      </span>
                      {submission.late && (
                        <Badge
                          variant='outline'
                          className='text-red-500 border-red-200 bg-red-50'
                        >
                          Late
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {submission.submittedAt
                      ? new Date(submission.submittedAt).toLocaleString()
                      : 'Not submitted'}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        submission.status === 'graded'
                          ? 'default'
                          : submission.status === 'submitted'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {submission.status === 'graded'
                        ? 'Graded'
                        : submission.status === 'submitted'
                          ? 'Submitted'
                          : 'Not Submitted'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {submission.grade !== null
                      ? `${submission.grade}/${assignment.maxPoints}`
                      : '-'}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      {submission.status !== 'not-submitted' && (
                        <Link
                          href={`/dashboard/assignments/${params.id}/submissions/${submission.id}`}
                        >
                          <Button variant='ghost' size='sm'>
                            {submission.status === 'graded'
                              ? 'Review'
                              : 'Grade'}
                          </Button>
                        </Link>
                      )}
                      {submission.status === 'not-submitted' && (
                        <Button variant='ghost' size='sm' disabled>
                          No Submission
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
