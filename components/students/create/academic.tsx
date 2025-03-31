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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface AcademicProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleNext?: () => void;
  handlePrevious: () => void;
}

export const Academic: React.FC<AcademicProps> = ({
  form,
  handleNext,
  handlePrevious,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
        <CardDescription>Enter the student's academic details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='academic.grade'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade/Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select grade' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='9A'>Grade 9A</SelectItem>
                    <SelectItem value='9B'>Grade 9B</SelectItem>
                    <SelectItem value='10A'>Grade 10A</SelectItem>
                    <SelectItem value='10B'>Grade 10B</SelectItem>
                    <SelectItem value='11A'>Grade 11A</SelectItem>
                    <SelectItem value='11B'>Grade 11B</SelectItem>
                    <SelectItem value='12A'>Grade 12A</SelectItem>
                    <SelectItem value='12B'>Grade 12B</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='academic.enrollmentDate'
            render={({ field }) => (
              <SingleDatePicker field={field} label='Enrollment Date' />
            )}
          />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='academic.previousSchool'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous School (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter previous school name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='academic.academicYear'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select academic year' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='2023-2024'>2023-2024</SelectItem>
                    <SelectItem value='2024-2025'>2024-2025</SelectItem>
                    <SelectItem value='2025-2026'>2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='academic.additionalNotes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Enter any additional academic information'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='button' onClick={handlePrevious}>
          Previous
        </Button>
        <Button type='submit'>Create Student</Button>
      </CardFooter>
    </Card>
  );
};
