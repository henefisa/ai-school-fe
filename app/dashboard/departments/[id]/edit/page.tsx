'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getError } from '@/utils/getError';
import EditDepartmentLoading from '@/app/dashboard/departments/[id]/edit/loading';
import { useGetDepartment } from '@/apis/departments/get-department';
import { useEditDepartment } from '@/apis/departments/edit';
import { formSchema } from '@/app/dashboard/departments/create/page';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getDisplayName } from '@/utils/get-display-name';
import { useListTeachers } from '@/apis/teachers/list-teachers';
import { cn } from '@/lib/utils';
import { DEPARTMENTS_KEYS } from '@/apis/departments/keys';

type FormValues = z.infer<typeof formSchema>;

export default function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const { data: department, isLoading } = useGetDepartment(id);
  const editDepartmentMutation = useEditDepartment({
    queryKey: DEPARTMENTS_KEYS.getDepartment(id),
  });
  const { data: listTeachers } = useListTeachers({
    page: 1,
    pageSize: 50,
    q: '',
    status: true,
  });

  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      headId: '',
      description: '',
      location: '',
      email: '',
      phoneNumber: '',
    },
  });

  const selectedTeacher = (value: string) =>
    listTeachers?.results.find((teacher) => teacher.id === value);

  useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        code: department.code,
        headId: department.headId,
        description: department.description,
        location: department.location,
        email: department.email,
        phoneNumber: department.phoneNumber,
      });
    }
  }, [department, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await editDepartmentMutation.mutateAsync({
        id: id,
        input: values,
      });

      toast({
        title: 'Department updated',
        description: `${values.name} has been updated successfully.`,
      });

      router.push(`/dashboard/departments/${id}`);
    } catch (error) {
      toast({
        title: 'Failed to update department',
        description:
          getError(error) ??
          'There was an error updating the department. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <EditDepartmentLoading />;
  }

  if (!department) {
    return (
      <div className='container mx-auto py-6'>
        <Card>
          <CardHeader>
            <CardTitle>Department Not Found</CardTitle>
            <CardDescription>
              The department record you are trying to edit does not exist or has
              been deleted.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href='/dashboard/departments'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Departments
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Button variant='outline' size='icon' asChild>
          <Link href={`/dashboard/departments/${id}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Edit Department</h1>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>
                Update the details for this department. All fields marked with *
                are required.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Department Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Computer Science'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Department Code</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., CS' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='headId'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Head of Department</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              role='combobox'
                              aria-expanded={open}
                              className='w-full justify-between'
                            >
                              {field.value
                                ? `${selectedTeacher(field.value)?.firstName} ${
                                    selectedTeacher(field.value)?.lastName
                                  }`
                                : 'Select head of department'}
                              <ChevronsUpDown className='opacity-50' />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-full p-0'>
                            <Command>
                              <CommandInput placeholder='Search head of department' />
                              <CommandList>
                                <CommandEmpty>No head found.</CommandEmpty>
                                <CommandGroup>
                                  {listTeachers?.results.map((teacher) => (
                                    <CommandItem
                                      key={teacher.id}
                                      value={teacher.id}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        setOpen(false);
                                      }}
                                    >
                                      {getDisplayName(teacher)}
                                      <Check
                                        className={cn(
                                          'ml-auto',
                                          field.value === teacher.id
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='e.g., cs@school.edu'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., (555) 123-4567' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Office Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Building A, Floor 2'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='space-y-2 md:col-span-2'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter a description of the department'
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' asChild>
                <Link href={`/dashboard/departments/${id}`}>Cancel</Link>
              </Button>
              <Button type='submit' disabled={editDepartmentMutation.isPending}>
                {editDepartmentMutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
