'use client';

import { useState } from 'react';
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
import { toast } from '@/components/ui/use-toast';

// Sample department data (in a real app, this would be fetched from an API)
const getDepartmentData = (id: string) => {
  const departments = [
    {
      id: '1',
      name: 'Mathematics',
      description: 'Mathematics and Statistics Department',
      head: 'Dr. John Smith',
      email: 'math@school.edu',
      phone: '(555) 123-4567',
      location: 'Building A, Room 101',
      createdAt: '2023-01-15',
      faculty: [
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
      ],
      courses: [
        { id: '1', code: 'MATH101', name: 'Introduction to Calculus' },
        { id: '2', code: 'MATH201', name: 'Advanced Calculus' },
        { id: '3', code: 'MATH301', name: 'Linear Algebra' },
        { id: '4', code: 'STAT101', name: 'Introduction to Statistics' },
      ],
    },
    {
      id: '2',
      name: 'Science',
      description: 'Natural Sciences Department',
      head: 'Dr. Emily Johnson',
      email: 'science@school.edu',
      phone: '(555) 123-4568',
      location: 'Building B, Room 205',
      createdAt: '2023-01-20',
      faculty: [
        {
          id: '4',
          name: 'Dr. Emily Johnson',
          position: 'Department Head',
          email: 'ejohnson@school.edu',
        },
        {
          id: '5',
          name: 'Dr. Michael Brown',
          position: 'Professor',
          email: 'mbrown@school.edu',
        },
        {
          id: '6',
          name: 'Ms. Sarah Wilson',
          position: 'Lab Coordinator',
          email: 'swilson@school.edu',
        },
      ],
      courses: [
        { id: '5', code: 'BIO101', name: 'Introduction to Biology' },
        { id: '6', code: 'CHEM101', name: 'General Chemistry' },
        { id: '7', code: 'PHYS101', name: 'Physics I' },
      ],
    },
  ];

  return departments.find((dept) => dept.id === id) || null;
};

export default function DepartmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch department data
  const department = getDepartmentData(params.id);

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

  // Handle department deletion
  const handleDeleteDepartment = () => {
    // In a real application, you would call an API to delete the department
    toast({
      title: 'Department deleted',
      description: `${department.name} has been deleted successfully.`,
    });
    setIsDeleteDialogOpen(false);
    router.push('/dashboard/departments');
  };

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
            <Link href={`/dashboard/departments/${params.id}/edit`}>
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
                  <h4 className='font-medium'>Head of Department</h4>
                  <p className='text-muted-foreground'>{department.head}</p>
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
                  <p className='text-muted-foreground'>{department.phone}</p>
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
                    {new Date(department.createdAt).toLocaleDateString()}
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
                {department.faculty.map((faculty) => (
                  <div key={faculty.id} className='flex flex-col space-y-1'>
                    <h4 className='font-medium'>{faculty.name}</h4>
                    <p className='text-sm text-muted-foreground'>
                      {faculty.position}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {faculty.email}
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
                {department.courses.map((course) => (
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
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
