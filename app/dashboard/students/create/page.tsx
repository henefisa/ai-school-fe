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

export enum StudentTab {
  Personal = 'personal',
  Contact = 'contact',
  Academic = 'academic',
  Parent = 'parent',
}

const personalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.date({ message: 'Date of birth is required' }),
  gender: z.nativeEnum(Gender),
  studentId: z.string().optional(),
  photo: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB',
    })
    .nullable(),
});

const contactSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State/Province is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().min(1, 'Phone number is required'),
});

const academicSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  enrollmentDate: z.date().nullable(),
  previousSchool: z.string().optional(),
  academicYear: z.string().min(1, 'Academic year is required'),
  additionalNotes: z.string().optional(),
});

const parentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
});

export const formSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  academic: academicSchema,
  parent: parentSchema,
});

export default function CreateStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(StudentTab.Personal);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal: {
        firstName: '',
        lastName: '',
        dob: undefined,
        photo: null,
        gender: Gender.Male,
        studentId: '',
      },
      contact: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        email: '',
        phone: '',
      },
      academic: {
        grade: '',
        enrollmentDate: null,
        previousSchool: '',
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs
            value={activeTab}
            onValueChange={(tab) => setActiveTab(tab as StudentTab)}
            className='space-y-4'
          >
            <TabsList>
              <TabsTrigger value={StudentTab.Personal}>
                Personal Information
              </TabsTrigger>
              <TabsTrigger value={StudentTab.Contact}>
                Contact Information
              </TabsTrigger>
              <TabsTrigger value={StudentTab.Academic}>
                Academic Information
              </TabsTrigger>
              <TabsTrigger value={StudentTab.Parent}>
                Parent/Guardian
              </TabsTrigger>
            </TabsList>
            <TabsContent value={StudentTab.Personal} className='space-y-4'>
              <Personal
                form={form}
                handleNext={async () => {
                  const isValid = await form.trigger('personal');

                  if (isValid) {
                    setActiveTab(StudentTab.Contact);
                  }
                }}
              />
            </TabsContent>
            <TabsContent value={StudentTab.Contact} className='space-y-4'>
              <Contact
                form={form}
                handleNext={async () => {
                  const isValid = await form.trigger('contact');

                  if (isValid) {
                    setActiveTab(StudentTab.Academic);
                  }
                }}
                handlePrevious={() => setActiveTab(StudentTab.Personal)}
              />
            </TabsContent>
            <TabsContent value={StudentTab.Academic} className='space-y-4'>
              <Academic
                form={form}
                handleNext={async () => {
                  const isValid = await form.trigger('academic');

                  if (isValid) {
                    setActiveTab(StudentTab.Parent);
                  }
                }}
                handlePrevious={() => setActiveTab(StudentTab.Contact)}
              />
            </TabsContent>
            <TabsContent value={StudentTab.Parent} className='space-y-4'>
              <Parent
                form={form}
                handlePrevious={() => setActiveTab(StudentTab.Academic)}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
