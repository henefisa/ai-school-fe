import { formSchema } from '@/app/dashboard/students/create/page';
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
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface PersonalProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const Personal: React.FC<PersonalProps> = ({ form }) => {
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
            name='student.firstName'
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
            name='student.lastName'
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
            name='student.dob'
            render={({ field }) => (
              <SingleDatePicker field={field} label='Date of Birth' />
            )}
          />
          <FormField
            control={form.control}
            name='student.gender'
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
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='student.studentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  {...field}
                  placeholder='Will be auto-generated if left blank'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='student.photo'
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
        <Button type='button'>Next</Button>
      </CardFooter>
    </Card>
  );
};
