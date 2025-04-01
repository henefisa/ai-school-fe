'use client';

import type React from 'react';
import { useState } from 'react';
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
import { useCreateParent } from '@/apis/parents/create';
import { formSchema } from '@/app/dashboard/parents/create/schema';
import { getError } from '@/utils/getError';

type FormValues = z.infer<typeof formSchema>;

export default function CreateParentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createParentMutation = useCreateParent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personal: {
        firstName: '',
        lastName: '',
        occupation: '',
      },
      contact: {
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'us',
      },
      emergencyContacts: [
        {
          name: '',
          relationship: '',
          phoneNumber: '',
          email: '',
        },
      ],
      notes: '',
      isActive: true,
      createStudentAfter: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const parentData = {
        personal: {
          firstName: values.personal.firstName,
          lastName: values.personal.lastName,
          occupation: values.personal.occupation || '',
        },
        contact: {
          email: values.contact.email,
          phoneNumber: values.contact.phoneNumber,
          address: values.contact.address,
          city: values.contact.city,
          state: values.contact.state,
          zipCode: values.contact.zipCode,
          country: values.contact.country,
        },
        emergencyContacts: values.emergencyContacts.map((contact) => ({
          name: contact.name,
          relationship: contact.relationship,
          phoneNumber: contact.phoneNumber,
          email: contact.email || '',
        })),
        notes: values.notes,
      };

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

  const addEmergencyContact = () => {
    const currentContacts = form.getValues('emergencyContacts');
    form.setValue('emergencyContacts', [
      ...currentContacts,
      { name: '', relationship: '', phoneNumber: '', email: '' },
    ]);
  };

  const removeEmergencyContact = (index: number) => {
    const currentContacts = form.getValues('emergencyContacts');
    if (currentContacts.length > 1) {
      form.setValue(
        'emergencyContacts',
        currentContacts.filter((_, i) => i !== index)
      );
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-6'
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter the parent's personal details
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='personal.firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='personal.lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Smith' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact.email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='john.smith@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact.phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='+1 (555) 123-4567' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='personal.occupation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder='Software Engineer' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>
                Enter the parent's address details
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='contact.address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder='123 Main St' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='contact.city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='Anytown' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact.state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder='CA' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contact.zipCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip/Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder='94321' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='contact.country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='ca'>Canada</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                        <SelectItem value='au'>Australia</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>
                Add emergency contacts for this parent
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {form.watch('emergencyContacts').map((_, index) => (
                <div key={index} className='space-y-4'>
                  {index > 0 && <Separator className='my-4' />}
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-medium'>Contact {index + 1}</h3>
                    {form.watch('emergencyContacts').length > 1 && (
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() => removeEmergencyContact(index)}
                      >
                        <Trash2 className='h-4 w-4 mr-1' />
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder='Sarah Smith' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.relationship`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <FormControl>
                            <Input placeholder='Spouse' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder='+1 (555) 987-6543' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`emergencyContacts.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type='email'
                              placeholder='sarah.smith@example.com'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addEmergencyContact}
                className='mt-2'
              >
                <Plus className='h-4 w-4 mr-1' />
                Add Another Contact
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>
                Add any additional notes or information about this parent
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter any additional information here...'
                        className='min-h-[100px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-3 space-y-0 pt-2'>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Active Status</FormLabel>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associated Students</CardTitle>
              <CardDescription>
                Link this parent to existing students or create new ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-sm text-muted-foreground'>
                  After creating this parent, you can associate them with
                  students from the student management page.
                </p>
                <FormField
                  control={form.control}
                  name='createStudentAfter'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Create a new student after saving</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-end gap-4'>
            <Button variant='outline' asChild>
              <Link href='/dashboard/parents'>Cancel</Link>
            </Button>
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
