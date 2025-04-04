'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileEdit,
  Trash2,
  User,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import DepartmentDetailLoading from '../loading';
import { useGetDepartment } from '@/apis/departments/get-department';
import { useDeleteDepartment } from '@/apis/departments/delete';
import { formatDate } from 'date-fns';

export default function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: department, isLoading } = useGetDepartment(id);
  const deleteDepartmentMutation = useDeleteDepartment();

  const faculty = [
    {
      id: '1',
      name: 'Dr. John Smith',
      position: 'Department Head',
      email: 'jsmith@school.edu',
    },
    {
      id: '2',
      name: 'Dr. Lisa Johnson',
      position: 'Professor',
      email: 'ljohnson@school.edu',
    },
    {
      id: '3',
      name: 'Mr. Robert Davis',
      position: 'Assistant Professor',
      email: 'rdavis@school.edu',
    },
  ];

  const courses = [
    { id: '1', code: 'CS101', name: 'Introduction to Computer Science' },
    { id: '2', code: 'CS201', name: 'Data Structures' },
    { id: '3', code: 'CS301', name: 'Algorithms' },
    { id: '4', code: 'CS401', name: 'Database Systems' },
  ];

  // Handle department deletion
  const handleDeleteDepartment = async () => {
    try {
      setIsDeleting(true);
      await deleteDepartmentMutation.mutateAsync(id);

      toast({
        title: 'Department deleted',
        description: `${department?.name} has been deleted successfully.`,
      });

      setIsDeleteDialogOpen(false);
      router.push('/dashboard/departments');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete department. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <DepartmentDetailLoading />;
  }

  if (!department) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <h2 className='text-2xl font-bold mb-2'>Department Not Found</h2>
          <p className='text-muted-foreground mb-4'>
            The department you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href='/dashboard/departments'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Departments
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
            <Link href='/dashboard/departments'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-3xl font-bold tracking-tight'>
            {department.name}
          </h1>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/dashboard/departments/${id}/edit`}>
              <FileEdit className='mr-2 h-4 w-4' /> Edit Department
            </Link>
          </Button>
          <Button
            variant='destructive'
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className='mr-2 h-4 w-4' /> Delete Department
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
            <CardDescription>
              Detailed information about the department.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium'>Description</h3>
              <p className='text-muted-foreground mt-1'>
                {department.description}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-2'>
                <User className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Department Code</h4>
                  <p className='text-muted-foreground'>{department.code}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <User className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Head of Department</h4>
                  <p className='text-muted-foreground'>{department.headId}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Mail className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Email</h4>
                  <p className='text-muted-foreground'>{department.email}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Phone className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Phone</h4>
                  <p className='text-muted-foreground'>
                    {department.phoneNumber}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <MapPin className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Location</h4>
                  <p className='text-muted-foreground'>{department.location}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Calendar className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Created On</h4>
                  <p className='text-muted-foreground'>
                    {formatDate(department.createdAt, 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Faculty Members</CardTitle>
              <CardDescription>
                Faculty members in this department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {faculty.map((member) => (
                  <div key={member.id} className='flex flex-col space-y-1'>
                    <h4 className='font-medium'>{member.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {member.position}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {member.email}
                    </p>
                    <Separator className='mt-2' />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full' asChild>
                <Link href='/dashboard/teachers'>View All Faculty</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                Courses offered by this department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {courses.map((course) => (
                  <div key={course.id} className='flex flex-col space-y-1'>
                    <h4 className='font-medium'>{course.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      Course Code: {course.code}
                    </p>
                    <Separator className='mt-2' />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant='outline' className='w-full' asChild>
                <Link href='/dashboard/courses'>View All Courses</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              department
              <strong> {department.name}</strong> and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDepartment}
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
