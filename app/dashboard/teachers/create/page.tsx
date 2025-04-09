'use client';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Personal } from '@/components/teachers/create/personal';
import { Contact } from '@/components/teachers/create/contact';
import { Professional } from '@/components/teachers/create/professional';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Gender } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { formSchema } from './schema';
import { useToast } from '@/hooks/use-toast';
import { getError } from '@/utils/getError';
import { useCreateTeacher } from '@/apis/teachers/create';
import { EmploymentType } from '@/types/employment-type';
import { TitleType } from '@/types/title';
import { useListDepartments } from '@/apis/departments/list-departments';

export enum TeacherTab {
  Personal = 'personal',
  Contact = 'contact',
  Professional = 'professional',
  Classes = 'classes',
}

export const defaultValues: z.infer<typeof formSchema> = {
  personal: {
    title: TitleType.Mr,
    employeeId: 'EMP2024001',
    firstName: '',
    lastName: '',
    dob: '',
    gender: Gender.Male,
    username: '',
    password: '',
    photo: undefined,
  },
  contact: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
    phoneNumber: '',
    emergencyContact: '',
  },
  professional: {
    departmentId: '',
    position: 'teacher',
    joinDate: '',
    employmentType: EmploymentType.FullTime,
    qualification: '',
    experience: '',
    specialization: '',
  },
};

export default function CreateTeacherPage() {
  const { toast } = useToast();
  const createTeacherMutation = useCreateTeacher();
  const [activeTab, setActiveTab] = useState(TeacherTab.Personal);

  const { data } = useListDepartments({
    page: 1,
    pageSize: 50,
    q: '',
    status: true,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTeacherMutation.mutateAsync(values);
      form.reset(defaultValues);
      setActiveTab(TeacherTab.Personal);
      toast({
        title: 'Teacher Creation Success 🎉',
        description: 'Teacher has been created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Teacher Creation Failed ❌',
        description:
          getError(error) ?? 'Failed to create teacher. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/teachers'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Teacher</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs
            value={activeTab}
            onValueChange={(tab) => setActiveTab(tab as TeacherTab)}
            className='space-y-4'
          >
            <TabsList>
              <TabsTrigger value={TeacherTab.Personal}>
                Personal Information
              </TabsTrigger>
              <TabsTrigger value={TeacherTab.Contact}>
                Contact Information
              </TabsTrigger>
              <TabsTrigger value={TeacherTab.Professional}>
                Professional Information
              </TabsTrigger>
              {/* <TabsTrigger value={TeacherTab.Classes}>
                Classes & Schedule
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value={TeacherTab.Personal} className='space-y-4'>
              <Personal
                form={form}
                handleNext={async () => {
                  const isValid = await form.trigger('personal');

                  if (isValid) {
                    setActiveTab(TeacherTab.Contact);
                  }
                }}
              />
            </TabsContent>
            <TabsContent value={TeacherTab.Contact} className='space-y-4'>
              <Contact
                form={form}
                handleNext={async () => {
                  const isValid = await form.trigger('contact');

                  if (isValid) {
                    setActiveTab(TeacherTab.Professional);
                  }
                }}
                handlePrevious={() => setActiveTab(TeacherTab.Personal)}
              />
            </TabsContent>
            <TabsContent value={TeacherTab.Professional} className='space-y-4'>
              <Professional
                listDepartments={data?.results ?? []}
                form={form}
                handlePrevious={() => setActiveTab(TeacherTab.Contact)}
                isSubmitting={createTeacherMutation.isPending}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
