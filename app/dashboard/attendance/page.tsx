'use client';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Calendar,
  Download,
  Filter,
  Save,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // Sample classes
  const classes = ['9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B'];

  // Sample students for attendance
  const students = [
    { id: 1, name: 'Emma Johnson', present: true, late: false, absent: false },
    { id: 2, name: 'Liam Smith', present: true, late: false, absent: false },
    { id: 3, name: 'Olivia Brown', present: false, late: true, absent: false },
    { id: 4, name: 'Noah Davis', present: true, late: false, absent: false },
    { id: 5, name: 'Sophia Wilson', present: false, late: false, absent: true },
    {
      id: 6,
      name: 'Jackson Miller',
      present: true,
      late: false,
      absent: false,
    },
    { id: 7, name: 'Ava Moore', present: true, late: false, absent: false },
    { id: 8, name: 'Lucas Taylor', present: true, late: false, absent: false },
    { id: 9, name: 'Mia Anderson', present: false, late: false, absent: true },
    { id: 10, name: 'Ethan Thomas', present: true, late: false, absent: false },
  ];

  // Sample attendance summary data
  const attendanceSummary = [
    {
      date: '2025-03-15',
      class: '10A',
      present: 25,
      late: 2,
      absent: 3,
      total: 30,
    },
    {
      date: '2025-03-14',
      class: '10A',
      present: 27,
      late: 1,
      absent: 2,
      total: 30,
    },
    {
      date: '2025-03-13',
      class: '10A',
      present: 26,
      late: 2,
      absent: 2,
      total: 30,
    },
    {
      date: '2025-03-12',
      class: '10A',
      present: 28,
      late: 0,
      absent: 2,
      total: 30,
    },
    {
      date: '2025-03-11',
      class: '10A',
      present: 24,
      late: 3,
      absent: 3,
      total: 30,
    },
    {
      date: '2025-03-10',
      class: '10A',
      present: 26,
      late: 2,
      absent: 2,
      total: 30,
    },
    {
      date: '2025-03-09',
      class: '10A',
      present: 27,
      late: 1,
      absent: 2,
      total: 30,
    },
  ];

  // Function to handle attendance change
  const handleAttendanceChange = (
    studentId: number,
    status: 'present' | 'late' | 'absent',
  ) => {
    // In a real application, this would update the state
    console.log(`Student ${studentId} marked as ${status}`);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Attendance</h1>
          <p className='text-muted-foreground'>
            Track and manage student attendance records.
          </p>
        </div>
        <Button className='sm:w-auto'>
          <Download className='mr-2 h-4 w-4' />
          Export Report
        </Button>
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>83.3%</div>
            <p className='text-xs text-muted-foreground'>
              25 out of 30 students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Late Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>6.7%</div>
            <p className='text-xs text-muted-foreground'>
              2 out of 30 students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>10.0%</div>
            <p className='text-xs text-muted-foreground'>
              3 out of 30 students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Weekly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>86.2%</div>
            <p className='text-xs text-muted-foreground'>Attendance rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='take-attendance'>
        <TabsList>
          <TabsTrigger value='take-attendance'>Take Attendance</TabsTrigger>
          <TabsTrigger value='attendance-records'>
            Attendance Records
          </TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent value='take-attendance' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>
                Record attendance for a class on a specific date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-3 mb-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Select Class</label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select class' />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          Class {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Select Date</label>
                  <div className='flex items-center gap-2'>
                    <Input
                      type='date'
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex items-end'>
                  <Button className='w-full'>
                    <Calendar className='mr-2 h-4 w-4' />
                    Load Class
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className='font-medium'>
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={() =>
                            handleAttendanceChange(student.id, 'present')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.late}
                          onCheckedChange={() =>
                            handleAttendanceChange(student.id, 'late')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={student.absent}
                          onCheckedChange={() =>
                            handleAttendanceChange(student.id, 'absent')
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder='Reason for absence/late'
                          className='h-8'
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className='mt-6 flex justify-end'>
                <Button>
                  <Save className='mr-2 h-4 w-4' />
                  Save Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='attendance-records' className='space-y-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  View attendance records for all classes
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search records...'
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceSummary.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell>{record.present}</TableCell>
                      <TableCell>{record.late}</TableCell>
                      <TableCell>{record.absent}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            (record.present / record.total) * 100 >= 90
                              ? 'default'
                              : (record.present / record.total) * 100 >= 80
                                ? 'secondary'
                                : 'destructive'
                          }
                        >
                          {Math.round((record.present / record.total) * 100)}%
                        </Badge>
                      </TableCell>
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
        <TabsContent value='reports' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>
                Generate and download attendance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <p className='font-medium'>Daily Attendance Report</p>
                    <p className='text-sm text-muted-foreground'>
                      Summary of today's attendance across all classes
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </div>
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <p className='font-medium'>Weekly Attendance Report</p>
                    <p className='text-sm text-muted-foreground'>
                      Summary of this week's attendance across all classes
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </div>
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <p className='font-medium'>Monthly Attendance Report</p>
                    <p className='text-sm text-muted-foreground'>
                      Summary of this month's attendance across all classes
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Custom Attendance Report</p>
                    <p className='text-sm text-muted-foreground'>
                      Generate a report for a specific date range and classes
                    </p>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
