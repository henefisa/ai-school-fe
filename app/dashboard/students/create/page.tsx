'use client';

import type React from 'react';
import { startTransition, useActionState, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
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
import { onSubmitAction } from './actions';
import { formSchema } from './schema';
import { flattenObjectToFormData } from '@/utils/flatten-object-to-form-data';

export enum StudentTab {
  Personal = 'personal',
  Contact = 'contact',
  Academic = 'academic',
  Parent = 'parent',
}

export default function CreateStudentPage() {
  const [state, formAction] = useActionState(onSubmitAction, {
    isSuccess: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(StudentTab.Personal);
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal: {
        firstName: '',
        lastName: '',
        dob: '',
        photo: undefined,
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
        enrollmentDate: '',
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      formAction(flattenObjectToFormData(values));
    });
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
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
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
