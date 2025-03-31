'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
import { formSchema } from '@/app/dashboard/teachers/create/schema';
import { useToast } from '@/hooks/use-toast';
import { getError } from '@/utils/getError';
import { useGetTeacher } from '@/apis/teachers/get-teacher';
import { useEditTeacher } from '@/apis/teachers/edit';
import { EmploymentType } from '@/types/employment-type';
import { TitleType } from '@/types/title';
import {
  defaultValues,
  TeacherTab,
} from '@/app/dashboard/teachers/create/page';
import { TEACHERS_KEYS } from '@/apis/teachers/keys';

export default function EditTeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(TeacherTab.Personal);

  const { data: teacher, isLoading } = useGetTeacher(id);
  const editTeacherMutation = useEditTeacher({
    queryKey: TEACHERS_KEYS.getTeacher(id),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        personal: {
          title: TitleType.Mr,
          employeeId: 'EMP2024001',
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          dob: teacher.dob,
          gender: teacher.gender as Gender,
          username: teacher.user.username,
          password: '',
          photo: undefined,
        },
        contact: {
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          email: teacher.email,
          phoneNumber: teacher.contactNumber,
          emergencyContact: '',
        },
        professional: {
          departmentId: teacher.departmentId,
          position: '',
          joinDate: teacher.hireDate,
          employmentType: EmploymentType.FullTime,
          qualification: '',
          experience: '',
          specialization: '',
        },
      });
    }
  }, [teacher, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editTeacherMutation.mutateAsync({
        id,
        input: values,
      });

      toast({
        title: 'Teacher Updated Successfully 🎉',
        description: 'Teacher information has been updated.',
      });

      router.push(`/dashboard/teachers/${id}`);
    } catch (error) {
      toast({
        title: 'Update Failed ❌',
        description:
          getError(error) ?? 'Failed to update teacher. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href={`/dashboard/teachers/${id}`}>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Edit Teacher</h1>
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
                form={form}
                isEdit
                handlePrevious={() => setActiveTab(TeacherTab.Contact)}
                isSubmitting={editTeacherMutation.isPending}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
