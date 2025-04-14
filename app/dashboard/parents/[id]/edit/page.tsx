'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGetParent } from '@/apis/parents/get-parent';
import { useEditParent } from '@/apis/parents/edit';
import { getError } from '@/utils/getError';
import { PARENTS_KEYS } from '@/apis/parents/keys';
import {
  formSchema,
  setParentPayload,
} from '@/app/dashboard/parents/create/schema';
import { defaultValues } from '@/app/dashboard/parents/create/defaultValues';
import { ParentPayload } from '@/apis/parents/type';
import { PersonalInfo } from '@/components/parents/create/personal';
import { AddressInfo } from '@/components/parents/create/address';
import { EmergencyContacts } from '@/components/parents/create/emergency-contacts';
import { AdditionalInfo } from '@/components/parents/create/additional';
import { AssociatedStudents } from '@/components/parents/create/associated-students';

type FormValues = z.infer<typeof formSchema>;

export default function EditParentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { data: parent, isLoading } = useGetParent(id);
  const editParentMutation = useEditParent({
    queryKey: PARENTS_KEYS.getParent(id),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (parent) {
      form.reset({
        personal: {
          firstName: parent.firstName,
          lastName: parent.lastName,
          occupation: parent.occupation || '',
        },
        contact: {
          email: parent.email,
          phoneNumber: parent.contactNumber1,
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        emergencyContacts: parent.emergencyContacts.map((contact) => ({
          name: contact.name,
          relationship: contact.relationship,
          phoneNumber: contact.phoneNumber,
          email: contact.email || '',
        })),
        notes: parent.notes || '',
        isActive: !parent.deletedAt,
      });
    }
  }, [parent, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const parentData: ParentPayload = setParentPayload(values);

      await editParentMutation.mutateAsync({
        id: id,
        input: parentData,
      });

      toast({
        title: 'Parent updated successfully',
        description: 'The parent record has been updated.',
      });

      router.push(`/dashboard/parents/${id}`);
    } catch (error) {
      toast({
        title: 'Failed to update parent',
        description:
          getError(error) ??
          'There was an error updating the parent record. Please try again.',
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
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='icon' asChild>
          <Link href={`/dashboard/parents/${id}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-2xl font-bold tracking-tight'>Edit Parent</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <PersonalInfo form={form} />
          <AddressInfo form={form} />
          <EmergencyContacts form={form} />
          <AdditionalInfo form={form} />
          <AssociatedStudents form={form} />
          <div className='flex justify-end '>
            <Button type='submit' disabled={editParentMutation.isPending}>
              {editParentMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Saving Parent'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
