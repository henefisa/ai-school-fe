'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { getDisplayName } from '@/utils/get-display-name';
import { format } from 'date-fns';
import { useGetStudent } from '@/apis/students/get-student';
import { Courses } from '@/components/students/detail/courses';
import { Grades } from '@/components/students/detail/grades';
import { Attendance } from '@/components/students/detail/attendance';
import { Documents } from '@/components/students/detail/documents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from '@/app/dashboard/students/[id]/schema';
import * as z from 'zod';
import { useEditStudent } from '@/apis/students/edit';
import { StudentPayload } from '@/apis/students/type';
import { useToast } from '@/hooks/use-toast';
import { DialogForm } from '@/app/dashboard/students/[id]/dialog-form';
import { getError } from '@/utils/getError';
import { Gender } from '@/types/profile';
import { STUDENTS_KEYS } from '@/apis/students/keys';

export enum StudentDetailTab {
  Courses = 'courses',
  Grades = 'grades',
  Attendance = 'attendance',
  Documents = 'documents',
}

const defaultValues: z.infer<typeof studentSchema> = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  dob: '',
  email: '',
  gender: Gender.Male,
  enrollmentDate: '',
};

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState(StudentDetailTab.Courses);
  const { data } = useGetStudent(id);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const editStudentMutation = useEditStudent({
    queryKey: STUDENTS_KEYS.getStudent(id),
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof studentSchema>) => {
    try {
      await editStudentMutation.mutateAsync({
        id,
        input: values as StudentPayload,
      });

      form.reset(defaultValues);

      setShowEditDialog(false);
      toast({
        title: 'Update Successful!',
        description: 'The student profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed!',
        description: getError(error) ?? 'An error occurred, please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (data) {
      const values: z.infer<typeof studentSchema> = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        contactNumber: data?.contactNumber,
        dob: data?.dob,
        email: data?.email,
        gender: data?.gender as Gender,
        enrollmentDate: data?.enrollmentDate,
      };
      form.reset(values);
    }
  }, [data]);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/students'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Student Profile</h1>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setShowEditDialog(true)}>
            Edit Profile
          </Button>
          <Button>Contact Parent</Button>
        </div>
      </div>
      {data && (
        <div className='grid gap-6 md:grid-cols-7'>
          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col items-center gap-4 text-center'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage
                    src={data?.user.photoUrl ?? ''}
                    alt={getDisplayName(data)}
                  />
                  <AvatarFallback>
                    {getDisplayName(data)
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className='text-xl font-bold'>{getDisplayName(data)}</h2>
                  <p className='text-muted-foreground'>Student ID: {data.id}</p>
                  <Badge
                    className='mt-2'
                    variant={data.user.isActive ? 'default' : 'destructive'}
                  >
                    {data.user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-2 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Grade:</span>
                    <span>{data.grade}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-2 gap-1 text-sm'>
                    <span className='text-muted-foreground'>
                      Date of Birth:
                    </span>
                    <span>{format(new Date(data.dob), 'dd/MM/yyyy')}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Address:</span>
                    <span>DN</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Email:</span>
                    <span>{data.email}</span>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <div className='grid grid-cols-1 gap-1 text-sm'>
                    <span className='text-muted-foreground'>Phone:</span>
                    <span>{data.contactNumber}</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2 pt-4 border-t'>
                <h3 className='font-medium'>Parent/Guardian Information</h3>
                <div className='space-y-2 text-sm'>
                  <div>
                    <span className='text-muted-foreground'>Name:</span>
                    <span className='ml-2'>{data.parentId}</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Email:</span>
                    <span className='ml-2'>{data.parentId}</span>
                  </div>
                  <div>
                    <span className='text-muted-foreground'>Phone:</span>
                    <span className='ml-2'>{data.parentId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='space-y-6 md:col-span-5'>
            <div className='grid gap-6 md:grid-cols-3'>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>3</div>
                  <p className='text-xs text-muted-foreground'>Out of 4.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='text-2xl font-bold'>50%</div>
                  <Progress value={50} className='h-2' />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Enrolled Since
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {format(new Date(data.enrollmentDate), 'dd/MM/yyyy')}
                  </div>
                  <p className='text-xs text-muted-foreground'>30 months</p>
                </CardContent>
              </Card>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(tab) => setActiveTab(tab as StudentDetailTab)}
            >
              <TabsList>
                <TabsTrigger value={StudentDetailTab.Courses}>
                  Courses
                </TabsTrigger>
                <TabsTrigger value={StudentDetailTab.Grades}>
                  Grades
                </TabsTrigger>
                <TabsTrigger value={StudentDetailTab.Attendance}>
                  Attendance
                </TabsTrigger>
                <TabsTrigger value={StudentDetailTab.Documents}>
                  Documents
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value={StudentDetailTab.Courses}
                className='space-y-4'
              >
                <Courses />
              </TabsContent>
              <TabsContent
                value={StudentDetailTab.Grades}
                className='space-y-4'
              >
                <Grades />
              </TabsContent>
              <TabsContent
                value={StudentDetailTab.Attendance}
                className='space-y-4'
              >
                <Attendance />
              </TabsContent>
              <TabsContent
                value={StudentDetailTab.Documents}
                className='space-y-4'
              >
                <Documents />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
      <DialogForm
        form={form}
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
}
