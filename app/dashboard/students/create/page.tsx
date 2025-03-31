'use client';

import type React from 'react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Academic } from '@/components/students/create/academic';
import { Contact } from '@/components/students/create/contact';
import { Personal } from '@/components/students/create/personal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Gender } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { formSchema } from './schema';
import { customAlphabet } from 'nanoid';
import { useToast } from '@/hooks/use-toast';
import { getError } from '@/utils/getError';
import { useCreateStudent } from '@/apis/students';

export enum StudentTab {
  Personal = 'personal',
  Contact = 'contact',
  Academic = 'academic',
  Parent = 'parent',
}

const nanoid = customAlphabet('1234567890', 10);

const defaultValues = {
  personal: {
    firstName: '',
    lastName: '',
    dob: '',
    gender: Gender.Male,
    studentId: '',
    password: '',
    username: '',
    photo: undefined,
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
    enrollmentDate: '',
    previousSchool: '',
    academicYear: '',
    additionalNotes: '',
  },
  parent: {
    parentId: 'af8b67e1-2652-476a-af63-bbc9703a902a',
  },
};

export default function CreateStudentPage() {
  const { toast } = useToast();
  const createStudentMutation = useCreateStudent();
  const [activeTab, setActiveTab] = useState(StudentTab.Personal);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const studentId = `${nanoid()}@domain.example.com`;

    const formattedValues = {
      ...values,
      personal: {
        ...values.personal,
        studentId,
      },
    };

    try {
      await createStudentMutation.mutateAsync(formattedValues);
      form.reset(defaultValues);
      setActiveTab(StudentTab.Personal);
      toast({
        title: 'Student Creation Success 🎉',
        description: 'Student has been created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Student Creation Failed ❌',
        description:
          getError(error) ?? 'Failed to create student. Please try again.',
        variant: 'destructive',
      });
    }
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
              {/* <TabsTrigger value={StudentTab.Parent}>
                Parent/Guardian
              </TabsTrigger> */}
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
                // handleNext={async () => {
                //   const isValid = await form.trigger('academic');

                //   if (isValid) {
                //     setActiveTab(StudentTab.Parent);
                //   }
                // }}
                handlePrevious={() => setActiveTab(StudentTab.Contact)}
              />
            </TabsContent>
            {/* <TabsContent value={StudentTab.Parent} className='space-y-4'>
              <Parent
                form={form}
                handlePrevious={() => setActiveTab(StudentTab.Academic)}
              />
            </TabsContent> */}
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
