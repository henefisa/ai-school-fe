import { formSchema } from '@/app/dashboard/students/create/page';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface ParentProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handlePrevious: () => void;
}

export const Parent: React.FC<ParentProps> = ({ form, handlePrevious }) => {
  const isLoading = false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parent/Guardian Information</CardTitle>
        <CardDescription>
          Enter the student's parent or guardian details
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='parent.name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent/Guardian Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Enter full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='parent.relationship'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select relationship' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='parent'>Parent</SelectItem>
                    <SelectItem value='guardian'>Legal Guardian</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='parent.email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter email address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='parent.phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='Enter phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='parent.address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address (if different from student)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Enter full address' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='parent.emergencyContact'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact Number</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder='Enter emergency contact number'
                  {...field}
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
        <Button type='submit' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creating...
            </>
          ) : (
            'Create Student'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
