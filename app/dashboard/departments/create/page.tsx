'use client';

import type React from 'react';

import { useState } from 'react';
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

export default function CreateDepartmentPage() {
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
      // In a real application, you would call an API to create the department
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Department created',
        description: `${formData.name} has been created successfully.`,
      });

      router.push('/dashboard/departments');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create department. Please try again.',
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
          <Link href='/dashboard/departments'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Create Department</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
            <CardDescription>
              Enter the details for the new department. All fields marked with *
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
              <Link href='/dashboard/departments'>Cancel</Link>
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Department'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
