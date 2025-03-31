import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download } from 'lucide-react';

export const Courses = () => {
  const courses = [
    {
      id: 1,
      code: 'MATH101',
      name: 'Algebra I',
      teacher: 'Dr. Robert Chen',
      grade: 'A',
      attendance: 97,
    },
    {
      id: 2,
      code: 'ENG203',
      name: 'English Literature',
      teacher: 'Sarah Johnson',
      grade: 'A-',
      attendance: 100,
    },
    {
      id: 3,
      code: 'SCI105',
      name: 'Biology',
      teacher: 'Michael Williams',
      grade: 'B+',
      attendance: 95,
    },
    {
      id: 4,
      code: 'HIST202',
      name: 'World History',
      teacher: 'Emily Davis',
      grade: 'A',
      attendance: 98,
    },
    {
      id: 5,
      code: 'CS101',
      name: 'Computer Science Fundamentals',
      teacher: 'David Martinez',
      grade: 'A+',
      attendance: 100,
    },
  ];

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Enrolled Courses</CardTitle>
        <Button variant='outline' size='sm'>
          <Download className='mr-2 h-4 w-4' />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className='font-medium'>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell>{course.grade}</TableCell>
                <TableCell>{course.attendance}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
