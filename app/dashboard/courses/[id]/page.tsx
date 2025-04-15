'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileEdit,
  Trash2,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useDeleteCourse } from '@/apis/courses/delete';
import { useGetCourse } from '@/apis/courses/get-course';
import { CourseStatus } from '@/apis/courses/type';
import { formatDate } from 'date-fns';
import { getError } from '@/utils/getError';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: course, isLoading } = useGetCourse(id);
  const deleteCourse = useDeleteCourse();

  const handleDeleteCourse = async () => {
    try {
      setIsDeleting(true);
      await deleteCourse.mutateAsync(id);

      toast({
        title: 'Course deleted',
        description: `${course?.name} has been deleted successfully.`,
      });

      setIsDeleteDialogOpen(false);
      router.push('/dashboard/courses');
    } catch (error) {
      toast({
        title: 'Error',
        description:
          getError(error) ?? 'Failed to delete course. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case CourseStatus.ACTIVE:
        return 'default';
      case CourseStatus.INACTIVE:
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex items-center justify-center h-[60vh]'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <h2 className='text-2xl font-bold mb-2'>Course Not Found</h2>
          <p className='text-muted-foreground mb-4'>
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href='/dashboard/courses'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/dashboard/courses'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>{course.name}</h1>
            <p className='text-muted-foreground'>{course.code}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/dashboard/courses/edit/${id}`}>
              <FileEdit className='mr-2 h-4 w-4' /> Edit Course
            </Link>
          </Button>
          <Button
            variant='destructive'
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className='mr-2 h-4 w-4' /> Delete Course
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>
              Detailed information about the course.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium'>Description</h3>
              <p className='text-muted-foreground mt-1'>{course.description}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-2'>
                <BookOpen className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Course Code</h4>
                  <p className='text-muted-foreground'>{course.code}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <GraduationCap className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Credits</h4>
                  <p className='text-muted-foreground'>{course.credits}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Users className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Department</h4>
                  <p className='text-muted-foreground'>
                    {course.department?.name}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Calendar className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Created On</h4>
                  <p className='text-muted-foreground'>
                    {formatDate(course.createdAt, 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='font-medium'>Status</h4>
              <div className='flex items-center gap-4'>
                <Badge variant={getStatusBadgeVariant(course.status)}>
                  {course.status}
                </Badge>
                {course.required && <Badge variant='outline'>Required</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                Courses required before taking this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-center py-4 text-muted-foreground'>
                No prerequisites defined for this course.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Courses</CardTitle>
              <CardDescription>
                Other courses in the same department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='text-center py-4 text-muted-foreground'>
                  No related courses found.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course
              <strong> {course.name}</strong> and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCourse}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
