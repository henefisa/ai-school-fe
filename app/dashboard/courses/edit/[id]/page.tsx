'use client';

import { use, useEffect } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { getError } from '@/utils/getError';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formSchema } from '@/app/dashboard/courses/create/page';
import { useGetCourse } from '@/apis/courses/get-course';
import { useEditCourse } from '@/apis/courses/edit';
import { useListDepartments } from '@/apis/departments/list-departments';
import { CourseStatus } from '@/apis/courses/type';
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
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { COURSES_KEYS } from '@/apis/courses/keys';

type FormValues = z.infer<typeof formSchema>;

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { data: course, isLoading } = useGetCourse(id);
  const editCourseMutation = useEditCourse({
    queryKey: COURSES_KEYS.getCourse(id),
  });
  const { data: departmentsData } = useListDepartments({
    page: 1,
    pageSize: 50,
    q: '',
    status: true,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      credits: 3,
      required: false,
      departmentId: '',
      status: CourseStatus.ACTIVE,
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name,
        code: course.code,
        description: course.description,
        credits: course.credits,
        required: course.required,
        departmentId: course.departmentId,
        status: course.status,
      });
    }
  }, [course, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      await editCourseMutation.mutateAsync({
        id: id,
        input: values,
      });

      toast({
        title: 'Course updated',
        description: `${values.name} has been updated successfully.`,
      });

      router.push(`/dashboard/courses/${id}`);
    } catch (error) {
      toast({
        title: 'Failed to update course',
        description:
          getError(error) ??
          'There was an error updating the course. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex items-center justify-center h-[60vh]'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='container mx-auto py-6'>
        <Card>
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
            <CardDescription>
              The course record you are trying to edit does not exist or has
              been deleted.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href='/dashboard/courses'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Courses
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
          <Link href={`/dashboard/courses/${id}`}>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Edit Course</h1>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Update the details for this course. All fields marked with * are
                required.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Introduction to Computer Science'
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
                      <FormLabel>Course Code</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g., CS101' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='credits'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Credits</FormLabel>
                      <FormControl>
                        <Input type='number' min={1} max={10} {...field} />
                      </FormControl>
                      <FormDescription>
                        Number of credit hours for this course
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='space-y-2'>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={CourseStatus.ACTIVE}>
                            Active
                          </SelectItem>
                          <SelectItem value={CourseStatus.INACTIVE}>
                            Inactive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='departmentId'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>Department</FormLabel>
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
                              ? departmentsData?.results.find(
                                  (department) => department.id === field.value
                                )?.name
                              : 'Select department'}
                            <ChevronsUpDown className='opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0'>
                          <Command>
                            <CommandInput placeholder='Search department' />
                            <CommandList>
                              <CommandEmpty>No department found.</CommandEmpty>
                              <CommandGroup>
                                {departmentsData?.results.map((department) => (
                                  <CommandItem
                                    key={department.id}
                                    value={department.id}
                                    onSelect={(currentValue) => {
                                      field.onChange(currentValue);
                                      setOpen(false);
                                    }}
                                  >
                                    {department.name}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        field.value === department.id
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
                name='description'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter a description of the course'
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='required'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Required Course
                      </FormLabel>
                      <FormDescription>
                        Mark if this course is required for the program
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' asChild>
                <Link href={`/dashboard/courses/${id}`}>Cancel</Link>
              </Button>
              <Button type='submit' disabled={editCourseMutation.isPending}>
                {editCourseMutation.isPending ? (
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
