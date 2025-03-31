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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gender } from '@/types/profile';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/app/dashboard/teachers/create/schema';
import { nanoid } from 'nanoid';
import { SingleDatePicker } from '@/components/date-picker/single-date-picker';
import { TitleType } from '@/types/title';

interface PersonalProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleNext: () => Promise<void>;
}

export function Personal({ form, handleNext }: PersonalProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter the teacher's basic personal information
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='personal.title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select title' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TitleType.Ms}>Ms.</SelectItem>
                    <SelectItem value={TitleType.Mr}>Mr.</SelectItem>
                    <SelectItem value={TitleType.Mrs}>Mrs.</SelectItem>
                    <SelectItem value={TitleType.Dr}>Dr.</SelectItem>
                    <SelectItem value={TitleType.Prof}>Prof.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='personal.photo'
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Photo (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type='file'
                    accept='image/*'
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
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
            name='personal.firstName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter first name' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='personal.lastName'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter last name' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='personal.username'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter username' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='personal.password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='flex gap-2'>
                    <Input
                      type='text'
                      placeholder='Enter password'
                      disabled
                      {...field}
                    />
                    <Button
                      type='button'
                      onClick={() => field.onChange(nanoid(12))}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='personal.dob'
            render={({ field }) => (
              <SingleDatePicker
                field={field}
                label='Date of Birth'
                CalendarProps={{ disabled: (date) => date > new Date() }}
              />
            )}
          />
          <FormField
            control={form.control}
            name='personal.gender'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value as Gender}
                    className='flex gap-4'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={Gender.Male} id='male' />
                      <FormLabel htmlFor='male'>Male</FormLabel>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={Gender.Female} id='female' />
                      <FormLabel htmlFor='female'>Female</FormLabel>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value={Gender.Other} id='other' />
                      <FormLabel htmlFor='other'>Other</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='button' disabled>
          Previous
        </Button>
        <Button type='button' onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
