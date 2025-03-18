'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDebounce from '@/hooks/use-debounce';
import {
  getStudents,
  StudentStatusFilter,
} from '@/queries/student/get-students';
import { getDisplayName } from '@/utils/get-display-name';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Download, PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';

export default function StudentsPage() {
  const supabase = createClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatusFilter>(
    StudentStatusFilter.ALL
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { data } = useQuery(
    getStudents(supabase, { status: statusFilter, q: debouncedSearchQuery })
  );

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
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Student Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Students
              </label>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='search'
                  type='search'
                  placeholder='Search by name...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <label htmlFor='status' className='text-sm font-medium'>
                Status
              </label>
              <Select
                value={statusFilter}
                onValueChange={(value: StudentStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StudentStatusFilter.ALL}>
                    All Students
                  </SelectItem>
                  <SelectItem value={StudentStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={StudentStatusFilter.INACTIVE}>
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Students List</CardTitle>
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
              {data?.length ? (
                data?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='font-medium'>
                      {getDisplayName(student.profiles)}
                    </TableCell>
                    {/* <TableCell>{student.grade}</TableCell> */}
                    <TableCell>12B1</TableCell>
                    <TableCell>{student.profiles?.gender}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          student.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.status ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    {/* <TableCell>{student.attendance}</TableCell> */}
                    <TableCell>95%</TableCell>
                    {/* <TableCell>{student.avgGrade}</TableCell> */}
                    <TableCell>A</TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm'>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className='h-24 text-center'>
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
