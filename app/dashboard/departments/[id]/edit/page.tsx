'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    },
  ];

  return departments.find((dept) => dept.id === id) || null;
};

export default function EditDepartmentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head: '',
    email: '',
    phone: '',
    location: '',
  });

  // Fetch department data
  useEffect(() => {
    const department = getDepartmentData(params.id);
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        head: department.head,
        email: department.email,
        phone: department.phone,
        location: department.location,
      });
    } else {
      // Department not found, redirect to departments list
      router.push('/dashboard/departments');
      toast({
        title: 'Department not found',
        description: "The department you're trying to edit doesn't exist.",
        variant: 'destructive',
      });
    }
  }, [params.id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would call an API to update the department
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Department updated',
        description: `${formData.name} has been updated successfully.`,
      });

      router.push(`/dashboard/departments/${params.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update department. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Button variant='outline' size='icon' asChild>
          <Link href={`/dashboard/departments/${params.id}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Edit Department</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
            <CardDescription>
              Update the details for this department. All fields marked with *
              are required.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='name'>
                  Department Name <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='e.g., Mathematics'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='head'>
                  Head of Department <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='head'
                  name='head'
                  placeholder='e.g., Dr. John Smith'
                  value={formData.head}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='description'>
                  Description <span className='text-destructive'>*</span>
                </Label>
                <Textarea
                  id='description'
                  name='description'
                  placeholder='Enter a description of the department'
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>
                  Email <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='e.g., math@school.edu'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>
                  Phone <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='phone'
                  name='phone'
                  placeholder='e.g., (555) 123-4567'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='location'>
                  Office Location <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='location'
                  name='location'
                  placeholder='e.g., Building A, Room 101'
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button variant='outline' asChild>
              <Link href={`/dashboard/departments/${params.id}`}>Cancel</Link>
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
