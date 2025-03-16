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
import { BookOpen, PlusCircle, Search, Users } from 'lucide-react';

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample classes data
  const classes = [
    {
      id: 1,
      name: 'Algebra I',
      grade: '10A',
      students: 30,
      schedule: 'Mon, Wed, Fri 9:00 AM',
      room: '101',
    },
    {
      id: 2,
      name: 'Algebra I',
      grade: '10B',
      students: 28,
      schedule: 'Mon, Wed, Fri 10:30 AM',
      room: '101',
    },
    {
      id: 3,
      name: 'Calculus',
      grade: '12A',
      students: 25,
      schedule: 'Tue, Thu 9:00 AM',
      room: '103',
    },
    {
      id: 4,
      name: 'Geometry',
      grade: '11B',
      students: 27,
      schedule: 'Tue, Thu 11:00 AM',
      room: '102',
    },
  ];

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.grade.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Classes</h1>
          <p className='text-muted-foreground'>
            Manage your classes and students
          </p>
        </div>
        <Button className='sm:w-auto'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Class
        </Button>
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Classes</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{classes.length}</div>
            <p className='text-xs text-muted-foreground'>Current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Students
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {classes.reduce((total, cls) => total + cls.students, 0)}
            </div>
            <p className='text-xs text-muted-foreground'>Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Class Size
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {Math.round(
                classes.reduce((total, cls) => total + cls.students, 0) /
                  classes.length,
              )}
            </div>
            <p className='text-xs text-muted-foreground'>Students per class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Teaching Hours
            </CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>Hours per week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Classes</CardTitle>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search classes...'
                className='w-full rounded-md pl-8 md:w-[300px]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>View and manage your classes</CardDescription>
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
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className='font-medium'>{cls.name}</TableCell>
                  <TableCell>{cls.grade}</TableCell>
                  <TableCell>
                    <Badge variant='outline'>{cls.students}</Badge>
                  </TableCell>
                  <TableCell>{cls.schedule}</TableCell>
                  <TableCell>{cls.room}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Link href={`/dashboard/classes/${cls.id}`}>
                        <Button variant='ghost' size='sm'>
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/classes/${cls.id}/students`}>
                        <Button variant='outline' size='sm'>
                          <Users className='mr-2 h-4 w-4' />
                          Students
                        </Button>
                      </Link>
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
