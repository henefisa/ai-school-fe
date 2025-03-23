'use client';

import type React from 'react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Academic } from '@/components/students/create/academic';
import { Contact } from '@/components/students/create/contact';
import { Parent } from '@/components/students/create/parent';
import { Personal } from '@/components/students/create/personal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Gender } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

export const formSchema = z.object({
  student: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dob: z.date().nullable(),
    gender: z.nativeEnum(Gender),
    studentId: z.string().optional(),
    photo: z
      .instanceof(File)
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: 'File size must be less than 5MB',
      })
      .nullable(),
  }),
  contact: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    country: z.string(),
    email: z.string().email('Invalid email'),
    phone: z.string(),
  }),
  academic: z.object({
    grade: z.string(),
    enrollmentDate: z.date().nullable(),
    previousSchool: z.string().nullable(),
    academicYear: z.string(),
    additionalNotes: z.string(),
  }),
  parent: z.object({
    name: z.string().min(1, 'Name is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    email: z.string().email('Invalid email'),
    phoneNumber: z.string(),
    address: z.string(),
    emergencyContact: z.string(),
  }),
});

export default function CreateStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: {
        firstName: '',
        lastName: '',
        dob: null,
        photo: null,
        gender: Gender.Male,
        studentId: '',
      },
      contact: {
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        email: '',
        phone: '',
      },
      academic: {
        grade: '',
        enrollmentDate: null,
        previousSchool: null,
        academicYear: '',
        additionalNotes: '',
      },
      parent: {
        name: '',
        relationship: '',
        email: '',
        phoneNumber: '',
        address: '',
        emergencyContact: '',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to create student
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/students');
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/students'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Student</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='space-y-4'
          >
            <TabsList>
              <TabsTrigger value='personal'>Personal Information</TabsTrigger>
              <TabsTrigger value='contact'>Contact Information</TabsTrigger>
              <TabsTrigger value='academic'>Academic Information</TabsTrigger>
              <TabsTrigger value='parent'>Parent/Guardian</TabsTrigger>
            </TabsList>
            <TabsContent value='personal' className='space-y-4'>
              <Personal form={form} />
            </TabsContent>
            <TabsContent value='contact' className='space-y-4'>
              <Contact form={form} />
            </TabsContent>
            <TabsContent value='academic' className='space-y-4'>
              <Academic form={form} />
            </TabsContent>
            <TabsContent value='parent' className='space-y-4'>
              <Parent form={form} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
