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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Download,
  Filter,
  MessageSquare,
  PencilIcon,
  Search,
  SlidersHorizontal,
  UserPlus,
} from 'lucide-react';

export default function ClassStudentsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Sample class data
  const classData = {
    id: params.id,
    name: 'Algebra I',
    grade: '10A',
    room: '101',
    schedule: 'Mon, Wed, Fri 9:00 AM',
    students: 30,
  };

  // Sample students data
  const students = [
    {
      id: 1,
      name: 'Emma Johnson',
      avatar: '/placeholder.svg',
      attendance: 98,
      grade: 'A',
      lastAssignment: 'Completed',
      status: 'Active',
      flags: [],
    },
    {
      id: 2,
      name: 'Liam Smith',
      avatar: '/placeholder.svg',
      attendance: 95,
      grade: 'B+',
      lastAssignment: 'Completed',
      status: 'Active',
      flags: [],
    },
    {
      id: 3,
      name: 'Olivia Brown',
      avatar: '/placeholder.svg',
      attendance: 78,
      grade: 'C',
      lastAssignment: 'Missing',
      status: 'Active',
      flags: ['Low Attendance', 'Missing Assignments'],
    },
    {
      id: 4,
      name: 'Noah Davis',
      avatar: '/placeholder.svg',
      attendance: 92,
      grade: 'B',
      lastAssignment: 'Completed',
      status: 'Active',
      flags: [],
    },
    {
      id: 5,
      name: 'Sophia Wilson',
      avatar: '/placeholder.svg',
      attendance: 85,
      grade: 'C+',
      lastAssignment: 'Late',
      status: 'Inactive',
      flags: ['Low Grades'],
    },
  ];

  // Sample student details data
  const studentDetails = {
    id: 1,
    name: 'Emma Johnson',
    avatar: '/placeholder.svg',
    grade: '10A',
    dateOfBirth: '2008-05-15',
    email: 'emma.johnson@example.com',
    phone: '(555) 123-4567',
    address: '123 School Lane, Cityville',
    parentName: 'Michael & Sarah Johnson',
    parentEmail: 'johnson.parents@example.com',
    parentPhone: '(555) 987-6543',
    academicRecord: {
      gpa: 3.8,
      attendance: 98,
      grades: [
        {
          assignment: 'Quadratic Equations Quiz',
          grade: '95/100',
          date: '2025-03-10',
        },
        {
          assignment: 'Linear Functions Test',
          grade: '92/100',
          date: '2025-02-25',
        },
        { assignment: 'Homework #5', grade: '88/100', date: '2025-02-15' },
      ],
      attendance_records: [
        { date: '2025-03-15', status: 'Present' },
        { date: '2025-03-14', status: 'Present' },
        { date: '2025-03-13', status: 'Present' },
        { date: '2025-03-12', status: 'Present' },
        { date: '2025-03-11', status: 'Present' },
      ],
    },
    notes: [
      {
        date: '2025-03-10',
        note: 'Excellent participation in class discussion today.',
      },
      {
        date: '2025-02-20',
        note: 'Requested extra help with factoring polynomials.',
      },
    ],
  };

  // Filter and sort students
  const filteredStudents = students
    .filter((student) => {
      // Apply search filter
      if (
        searchQuery &&
        !student.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply status filter
      if (filterBy === 'active' && student.status !== 'Active') {
        return false;
      }
      if (filterBy === 'inactive' && student.status !== 'Inactive') {
        return false;
      }
      if (filterBy === 'flagged' && student.flags.length === 0) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'grade') {
        return a.grade.localeCompare(b.grade);
      }
      if (sortBy === 'attendance') {
        return b.attendance - a.attendance;
      }
      return 0;
    });

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/classes'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>
            Class: {classData.name} ({classData.grade})
          </h1>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Button>
            <UserPlus className='mr-2 h-4 w-4' />
            Add Student
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-muted-foreground'>
            Room {classData.room} • {classData.schedule} • {classData.students}{' '}
            students
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search students...'
              className='w-full rounded-md pl-8 sm:w-[300px]'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className='w-[130px]'>
              <Filter className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Filter' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Students</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
              <SelectItem value='flagged'>Flagged</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[130px]'>
              <SlidersHorizontal className='mr-2 h-4 w-4' />
              <SelectValue placeholder='Sort' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Name</SelectItem>
              <SelectItem value='grade'>Grade</SelectItem>
              <SelectItem value='attendance'>Attendance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-12'>
        {/* Students List */}
        <div
          className={
            selectedStudent ? 'md:col-span-5 lg:col-span-4' : 'md:col-span-12'
          }
        >
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
              <CardDescription>Manage students in this class</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[40px]'>
                      <Checkbox />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Attendance
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Grade
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Status
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className={
                        selectedStudent === student.id ? 'bg-muted' : ''
                      }
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <TableCell>
                        <Checkbox onClick={(e) => e.stopPropagation()} />
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={student.avatar}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-medium'>{student.name}</div>
                            {student.flags.length > 0 && (
                              <div className='flex gap-1 mt-1'>
                                {student.flags.map((flag, index) => (
                                  <Badge
                                    key={index}
                                    variant='destructive'
                                    className='text-xs'
                                  >
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Badge
                          variant={
                            student.attendance >= 90
                              ? 'outline'
                              : student.attendance >= 80
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {student.attendance}%
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Badge
                          variant={
                            student.grade.startsWith('A')
                              ? 'default'
                              : student.grade.startsWith('B')
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {student.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Badge
                          variant={
                            student.status === 'Active'
                              ? 'outline'
                              : 'secondary'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageSquare className='h-4 w-4' />
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PencilIcon className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div className='md:col-span-7 lg:col-span-8'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={studentDetails.avatar}
                        alt={studentDetails.name}
                      />
                      <AvatarFallback>
                        {studentDetails.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{studentDetails.name}</CardTitle>
                      <CardDescription>
                        Student ID: {studentDetails.id}
                      </CardDescription>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <MessageSquare className='mr-2 h-4 w-4' />
                      Message
                    </Button>
                    <Button size='sm'>
                      <PencilIcon className='mr-2 h-4 w-4' />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='overview'>
                  <TabsList>
                    <TabsTrigger value='overview'>Overview</TabsTrigger>
                    <TabsTrigger value='grades'>Grades</TabsTrigger>
                    <TabsTrigger value='attendance'>Attendance</TabsTrigger>
                    <TabsTrigger value='notes'>Notes</TabsTrigger>
                    <TabsTrigger value='contact'>Contact</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value='overview' className='space-y-4'>
                    <div className='grid gap-4 md:grid-cols-3'>
                      <Card>
                        <CardHeader className='pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            GPA
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='text-2xl font-bold'>
                            {studentDetails.academicRecord.gpa}
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Out of 4.0
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className='pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Attendance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='text-2xl font-bold'>
                            {studentDetails.academicRecord.attendance}%
                          </div>
                          <p className='text-xs text-muted-foreground'>
                            Current semester
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className='pb-2'>
                          <CardTitle className='text-sm font-medium'>
                            Last Assignment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='text-2xl font-bold'>95%</div>
                          <p className='text-xs text-muted-foreground'>
                            Quadratic Equations Quiz
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className='grid gap-4 md:grid-cols-2'>
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Grades</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-4'>
                            {studentDetails.academicRecord.grades.map(
                              (grade, index) => (
                                <div
                                  key={index}
                                  className='flex justify-between border-b pb-2 last:border-0 last:pb-0'
                                >
                                  <div>
                                    <p className='font-medium'>
                                      {grade.assignment}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                      {new Date(
                                        grade.date,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Badge variant='outline'>{grade.grade}</Badge>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Attendance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className='space-y-4'>
                            {studentDetails.academicRecord.attendance_records.map(
                              (record, index) => (
                                <div
                                  key={index}
                                  className='flex justify-between border-b pb-2 last:border-0 last:pb-0'
                                >
                                  <p className='text-sm'>
                                    {new Date(record.date).toLocaleDateString()}
                                  </p>
                                  <Badge
                                    variant={
                                      record.status === 'Present'
                                        ? 'outline'
                                        : 'destructive'
                                    }
                                  >
                                    {record.status}
                                  </Badge>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Grades Tab */}
                  <TabsContent value='grades' className='space-y-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Grade History</CardTitle>
                        <CardDescription>
                          Complete grade history for this student
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Assignment</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead className='text-right'>
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentDetails.academicRecord.grades.map(
                              (grade, index) => (
                                <TableRow key={index}>
                                  <TableCell className='font-medium'>
                                    {grade.assignment}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(grade.date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant='outline'>
                                      {grade.grade}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className='text-right'>
                                    <Button variant='ghost' size='sm'>
                                      Edit
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                        <div className='mt-4 flex justify-end'>
                          <Button>
                            <PencilIcon className='mr-2 h-4 w-4' />
                            Add Grade
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Attendance Tab */}
                  <TabsContent value='attendance' className='space-y-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Attendance History</CardTitle>
                        <CardDescription>
                          Complete attendance record for this student
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Notes</TableHead>
                              <TableHead className='text-right'>
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentDetails.academicRecord.attendance_records.map(
                              (record, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {new Date(record.date).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        record.status === 'Present'
                                          ? 'outline'
                                          : 'destructive'
                                      }
                                    >
                                      {record.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>-</TableCell>
                                  <TableCell className='text-right'>
                                    <Button variant='ghost' size='sm'>
                                      Edit
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value='notes' className='space-y-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Teacher Notes</CardTitle>
                        <CardDescription>
                          Private notes about this student
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          {studentDetails.notes.map((note, index) => (
                            <div
                              key={index}
                              className='border-b pb-4 last:border-0 last:pb-0'
                            >
                              <div className='flex justify-between mb-2'>
                                <p className='font-medium'>
                                  {new Date(note.date).toLocaleDateString()}
                                </p>
                                <Button variant='ghost' size='sm'>
                                  Edit
                                </Button>
                              </div>
                              <p className='text-sm'>{note.note}</p>
                            </div>
                          ))}
                        </div>
                        <div className='mt-4'>
                          <Input
                            placeholder='Add a new note...'
                            className='mb-2'
                          />
                          <Button>Add Note</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent value='contact' className='space-y-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2'>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Date of Birth:
                            </span>
                            <span>
                              {new Date(
                                studentDetails.dateOfBirth,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Email:
                            </span>
                            <span>{studentDetails.email}</span>
                          </div>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Phone:
                            </span>
                            <span>{studentDetails.phone}</span>
                          </div>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Address:
                            </span>
                            <span>{studentDetails.address}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Parent/Guardian Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2'>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>Name:</span>
                            <span>{studentDetails.parentName}</span>
                          </div>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Email:
                            </span>
                            <span>{studentDetails.parentEmail}</span>
                          </div>
                          <div className='grid grid-cols-2 gap-1 text-sm'>
                            <span className='text-muted-foreground'>
                              Phone:
                            </span>
                            <span>{studentDetails.parentPhone}</span>
                          </div>
                        </div>
                        <div className='mt-4 flex gap-2'>
                          <Button variant='outline'>
                            <MessageSquare className='mr-2 h-4 w-4' />
                            Message Parent
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
