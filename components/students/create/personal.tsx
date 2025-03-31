import { formSchema } from '@/app/dashboard/students/create/schema';
import { SingleDatePicker } from '@/components/date-picker/single-date-picker';
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
import { Gender } from '@/types/profile';
import { nanoid } from 'nanoid';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface PersonalProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleNext: () => void;
}

export const Personal: React.FC<PersonalProps> = ({ form, handleNext }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter the student's basic personal information
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='personal.firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter first name'
                    {...field}
                  />
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
                  <Input type='text' placeholder='Enter last name' {...field} />
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
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Enter username' {...field} />
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
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    className='flex gap-4'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <RadioGroupItem value={Gender.Male} />
                      </FormControl>
                      <FormLabel className='font-normal'>Male</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <RadioGroupItem value={Gender.Female} />
                      </FormControl>
                      <FormLabel className='font-normal'>Female</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <RadioGroupItem value={Gender.Other} />
                      </FormControl>
                      <FormLabel className='font-normal'>Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
                <input
                  type='hidden'
                  name={field.name}
                  value={field.value ?? ''}
                />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='personal.studentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Will be auto-generated if left blank'
                  {...field}
                />
              </FormControl>
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
};
