'use client';

import { useState } from 'react';
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
import { useCreateDepartment } from '@/apis/departments/create';
import { useListTeachers } from '@/apis/teachers/list-teachers';
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
import { cn } from '@/lib/utils';
import { getDisplayName } from '@/utils/get-display-name';

export const formSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  code: z.string().min(1, 'Department code is required'),
  headId: z.string().min(1, 'Head of department is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateDepartmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createDepartmentMutation = useCreateDepartment();
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

  const onSubmit = async (values: FormValues) => {
    try {
      await createDepartmentMutation.mutateAsync(values);

      toast({
        title: 'Department created',
        description: `${values.name} has been created successfully.`,
      });

      router.push('/dashboard/departments');
    } catch (error) {
      toast({
        title: 'Failed to create department',
        description:
          getError(error) ??
          'There was an error creating the department. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/dashboard/departments'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Create Department</h1>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>
                Enter the details for the new department. All fields marked with
                * are required.
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
                <Link href='/dashboard/departments'>Cancel</Link>
              </Button>
              <Button
                type='submit'
                disabled={createDepartmentMutation.isPending}
              >
                {createDepartmentMutation.isPending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating...
                  </>
                ) : (
                  'Create Department'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
