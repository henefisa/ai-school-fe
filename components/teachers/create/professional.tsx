'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/app/dashboard/teachers/create/schema';
import { SingleDatePicker } from '@/components/date-picker/single-date-picker';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { EmploymentType } from '@/types/employment-type';
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
import { useState } from 'react';
import { DepartmentResponse } from '@/apis/departments/type';

interface ProfessionalProps {
  listDepartments: DepartmentResponse[];
  isEdit?: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  isSubmitting: boolean;
  handlePrevious: () => void;
}

export function Professional({
  listDepartments,
  isEdit,
  form,
  isSubmitting,
  handlePrevious,
}: ProfessionalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Information</CardTitle>
        <CardDescription>
          Enter the teacher's professional details
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='professional.departmentId'
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
                          ? listDepartments.find(
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
                            {listDepartments.map((department) => (
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
            name='professional.position'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select position' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='teacher'>Teacher</SelectItem>
                    <SelectItem value='head-teacher'>Head Teacher</SelectItem>
                    <SelectItem value='department-head'>
                      Department Head
                    </SelectItem>
                    <SelectItem value='coordinator'>Coordinator</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='professional.employmentType'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select employment type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EmploymentType.FullTime}>
                      Full-time
                    </SelectItem>
                    <SelectItem value={EmploymentType.PartTime}>
                      Part-time
                    </SelectItem>
                    <SelectItem value={EmploymentType.Contract}>
                      Contract
                    </SelectItem>
                    <SelectItem value={EmploymentType.Temporary}>
                      Temporary
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='professional.qualification'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter highest qualification (e.g., Ph.D in Mathematics)'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='professional.experience'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter years of teaching experience'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='professional.specialization'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter area of specialization'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='professional.joinDate'
          render={({ field }) => (
            <SingleDatePicker
              field={field}
              label='Join Date'
              CalendarProps={{ disabled: (date) => date > new Date() }}
            />
          )}
        />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='button' onClick={handlePrevious}>
          Previous
        </Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creating...
            </>
          ) : isEdit ? (
            'Edit Teacher'
          ) : (
            'Create Teacher'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
