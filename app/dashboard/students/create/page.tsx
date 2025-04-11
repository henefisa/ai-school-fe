'use client';

import type React from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Academic } from '@/components/students/create/academic';
import { Contact } from '@/components/students/create/contact';
import { Personal } from '@/components/students/create/personal';
import { Button } from '@/components/ui/button';
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
import { Parent } from '@/components/students/create/parent';
import { useRouter } from 'next/navigation';

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
    parentId: '',
  },
};

export default function CreateStudentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createStudentMutation = useCreateStudent();

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
      toast({
        title: 'Student Creation Success 🎉',
        description: 'Student has been created successfully!',
      });
      router.push('/dashboard/students');
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Personal form={form} />
          <Contact form={form} />
          <Academic form={form} />
          <Parent form={form} />
          <div className='flex justify-between'>
            <Button variant='outline'>
              <Link href='/dashboard/students'>Cancel</Link>
            </Button>
            <Button type='submit' disabled={createStudentMutation.isPending}>
              {createStudentMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                'Create Student'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
