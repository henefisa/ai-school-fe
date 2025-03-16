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
  Download,
  Filter,
  PlusCircle,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

export default function TeachersPage() {
  // Sample teacher data
  const teachers = [
    {
      id: 1,
      name: 'Dr. Robert Chen',
      department: 'Mathematics',
      qualification: 'Ph.D',
      experience: '15 years',
      classes: '4',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'English',
      qualification: 'M.A.',
      experience: '8 years',
      classes: '5',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Michael Williams',
      department: 'Science',
      qualification: 'Ph.D',
      experience: '12 years',
      classes: '3',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Emily Davis',
      department: 'History',
      qualification: 'M.A.',
      experience: '6 years',
      classes: '4',
      status: 'Active',
    },
    {
      id: 5,
      name: 'James Wilson',
      department: 'Physical Education',
      qualification: 'B.Ed',
      experience: '10 years',
      classes: '6',
      status: 'On Leave',
    },
    {
      id: 6,
      name: 'Jennifer Taylor',
      department: 'Art',
      qualification: 'M.F.A.',
      experience: '7 years',
      classes: '5',
      status: 'Active',
    },
    {
      id: 7,
      name: 'David Martinez',
      department: 'Computer Science',
      qualification: 'M.S.',
      experience: '9 years',
      classes: '3',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      department: 'Music',
      qualification: 'M.Mus.',
      experience: '11 years',
      classes: '4',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Thomas Brown',
      department: 'Geography',
      qualification: 'Ph.D',
      experience: '14 years',
      classes: '3',
      status: 'On Leave',
    },
    {
      id: 10,
      name: 'Patricia Miller',
      department: 'Chemistry',
      qualification: 'Ph.D',
      experience: '13 years',
      classes: '4',
      status: 'Active',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Teachers</h1>
          <p className='text-muted-foreground'>
            Manage teacher information, assignments, and performance.
          </p>
        </div>
        <Button className='sm:w-auto'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Teacher
        </Button>
      </div>

      <Tabs defaultValue='all'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <TabsList>
            <TabsTrigger value='all'>All Teachers</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='on-leave'>On Leave</TabsTrigger>
          </TabsList>
          <div className='mt-4 flex items-center gap-2 sm:mt-0'>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search teachers...'
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
              <CardTitle>All Teachers</CardTitle>
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
                    <TableHead>Department</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className='font-medium'>
                        {teacher.name}
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.qualification}</TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell>{teacher.classes}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            teacher.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {teacher.status}
                        </span>
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
        <TabsContent value='active' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Active Teachers</CardTitle>
              <CardDescription>
                Teachers who are currently teaching and active in the school.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers
                    .filter((teacher) => teacher.status === 'Active')
                    .map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className='font-medium'>
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>{teacher.qualification}</TableCell>
                        <TableCell>{teacher.experience}</TableCell>
                        <TableCell>{teacher.classes}</TableCell>
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
        <TabsContent value='on-leave' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Teachers On Leave</CardTitle>
              <CardDescription>
                Teachers who are currently on leave or sabbatical.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers
                    .filter((teacher) => teacher.status === 'On Leave')
                    .map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell className='font-medium'>
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.department}</TableCell>
                        <TableCell>{teacher.qualification}</TableCell>
                        <TableCell>{teacher.experience}</TableCell>
                        <TableCell>{teacher.classes}</TableCell>
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
