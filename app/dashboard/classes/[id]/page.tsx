'use client';
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
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  PencilIcon,
  Users,
} from 'lucide-react';

export default function ClassDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Sample class data
  const classData = {
    id: params.id,
    name: 'Algebra I',
    grade: '10A',
    room: '101',
    schedule: 'Mon, Wed, Fri 9:00 AM',
    students: 30,
    description:
      'Introduction to algebraic concepts including linear equations, polynomials, and factoring.',
  };

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
            <PencilIcon className='mr-2 h-4 w-4' />
            Edit Class
          </Button>
          <Link href={`/dashboard/classes/${params.id}/students`}>
            <Button>
              <Users className='mr-2 h-4 w-4' />
              View Students
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Students</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{classData.students}</div>
            <p className='text-xs text-muted-foreground'>Enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Room</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{classData.room}</div>
            <p className='text-xs text-muted-foreground'>Classroom number</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Schedule</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>MWF</div>
            <p className='text-xs text-muted-foreground'>
              {classData.schedule}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Assignments</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>Total assignments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='students'>Students</TabsTrigger>
          <TabsTrigger value='assignments'>Assignments</TabsTrigger>
          <TabsTrigger value='grades'>Grades</TabsTrigger>
          <TabsTrigger value='attendance'>Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Class Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{classData.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Class Statistics</CardTitle>
              <CardDescription>
                Performance metrics for this class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-3'>
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Average Grade</h3>
                  <div className='flex items-center gap-2'>
                    <Badge className='text-lg'>B+</Badge>
                    <span className='text-sm text-muted-foreground'>(87%)</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Attendance Rate</h3>
                  <div className='flex items-center gap-2'>
                    <Badge variant='outline' className='text-lg'>
                      94%
                    </Badge>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-sm font-medium'>Assignment Completion</h3>
                  <div className='flex items-center gap-2'>
                    <Badge variant='secondary' className='text-lg'>
                      92%
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='students'>
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                <Link
                  href={`/dashboard/classes/${params.id}/students`}
                  className='text-primary hover:underline'
                >
                  View detailed student management
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center py-8 text-muted-foreground'>
                Click the button above to access the full student management
                interface
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='assignments'>
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Manage class assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center py-8 text-muted-foreground'>
                Assignment management interface will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='grades'>
          <Card>
            <CardHeader>
              <CardTitle>Grades</CardTitle>
              <CardDescription>Manage student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center py-8 text-muted-foreground'>
                Grade management interface will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='attendance'>
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Track student attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-center py-8 text-muted-foreground'>
                Attendance tracking interface will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
