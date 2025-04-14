'use client';

import type React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { useCreateParent } from '@/apis/parents/create';
import { formSchema, setParentPayload } from './schema';
import { getError } from '@/utils/getError';
import { EmergencyContacts } from '@/components/parents/create/emergency-contacts';
import { PersonalInfo } from '@/components/parents/create/personal';
import { AddressInfo } from '@/components/parents/create/address';
import { AdditionalInfo } from '@/components/parents/create/additional';
import { AssociatedStudents } from '@/components/parents/create/associated-students';
import { defaultValues } from './defaultValues';
import { ParentPayload } from '@/apis/parents/type';

export type FormValues = z.infer<typeof formSchema>;

export default function CreateParentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createParentMutation = useCreateParent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const parentData: ParentPayload = setParentPayload(values);
      await createParentMutation.mutateAsync(parentData);

      toast({
        title: 'Parent created successfully',
        description: 'The parent record has been created.',
      });

      router.push('/dashboard/parents');
    } catch (error) {
      toast({
        title: 'Failed to create parent',
        description:
          getError(error) ??
          'There was an error creating the parent record. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/dashboard/parents'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-2xl font-bold tracking-tight'>Create Parent</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <PersonalInfo form={form} />
          <AddressInfo form={form} />
          <EmergencyContacts form={form} />
          <AdditionalInfo form={form} />
          <AssociatedStudents form={form} />
          <div className='flex justify-end '>
            <Button type='submit' disabled={createParentMutation.isPending}>
              {createParentMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                'Create Parent'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
