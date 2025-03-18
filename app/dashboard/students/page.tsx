'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStudents } from '@/queries/student/get-students';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  Download,
  Filter,
  PlusCircle,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export default function StudentsPage() {
  const supabase = createClient();
  const { data } = useQuery(getStudents(supabase));

  console.log(data);

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '10A',
      gender: 'Female',
      status: 'Active',
      attendance: '98%',
      avgGrade: 'A',
    },
    {
      id: 2,
      name: 'Liam Smith',
      grade: '9B',
      gender: 'Male',
      status: 'Active',
      attendance: '95%',
      avgGrade: 'B+',
    },
    {
      id: 3,
      name: 'Olivia Brown',
      grade: '11C',
      gender: 'Female',
      status: 'Active',
      attendance: '97%',
      avgGrade: 'A-',
    },
    {
      id: 4,
      name: 'Noah Davis',
      grade: '10A',
      gender: 'Male',
      status: 'Active',
      attendance: '92%',
      avgGrade: 'B',
    },
    {
      id: 5,
      name: 'Sophia Wilson',
      grade: '9B',
      gender: 'Female',
      status: 'Inactive',
      attendance: '85%',
      avgGrade: 'C+',
    },
    {
      id: 6,
      name: 'Jackson Miller',
      grade: '11C',
      gender: 'Male',
      status: 'Active',
      attendance: '94%',
      avgGrade: 'B+',
    },
    {
      id: 7,
      name: 'Ava Moore',
      grade: '10A',
      gender: 'Female',
      status: 'Active',
      attendance: '99%',
      avgGrade: 'A+',
    },
    {
      id: 8,
      name: 'Lucas Taylor',
      grade: '9B',
      gender: 'Male',
      status: 'Active',
      attendance: '91%',
      avgGrade: 'B-',
    },
    {
      id: 9,
      name: 'Mia Anderson',
      grade: '11C',
      gender: 'Female',
      status: 'Inactive',
      attendance: '80%',
      avgGrade: 'C',
    },
    {
      id: 10,
      name: 'Ethan Thomas',
      grade: '10A',
      gender: 'Male',
      status: 'Active',
      attendance: '96%',
      avgGrade: 'A-',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Students</h1>
          <p className='text-muted-foreground'>
            Manage student information, records, and performance.
          </p>
        </div>
        <Button className='sm:w-auto'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Student
        </Button>
      </div>

      <Tabs defaultValue='all'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <TabsList>
            <TabsTrigger value='all'>All Students</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
          </TabsList>
          <div className='mt-4 flex items-center gap-2 sm:mt-0'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search students...'
                className='w-full rounded-md pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
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
        </div>
        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>All Students</CardTitle>
              <Button variant='outline' size='sm'>
                <Download className='mr-2 h-4 w-4' />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Avg. Grade</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className='font-medium'>
                        {student.name}
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            student.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>{student.attendance}</TableCell>
                      <TableCell>{student.avgGrade}</TableCell>
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
        <TabsContent value='active' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>
                Students who are currently enrolled and active in the school.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Avg. Grade</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((student) => student.status === 'Active')
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className='font-medium'>
                          {student.name}
                        </TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>{student.avgGrade}</TableCell>
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
        <TabsContent value='inactive' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Inactive Students</CardTitle>
              <CardDescription>
                Students who are currently not active or have been withdrawn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Avg. Grade</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((student) => student.status === 'Inactive')
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className='font-medium'>
                          {student.name}
                        </TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                        <TableCell>{student.avgGrade}</TableCell>
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
      </Tabs>
    </div>
  );
}
