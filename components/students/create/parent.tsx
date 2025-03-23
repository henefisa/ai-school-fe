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
}

export const Parent: React.FC<ParentProps> = ({ form }) => {
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
          <div className='space-y-2'>
            <Label htmlFor='parent-name'>Parent/Guardian Name</Label>
            <Input id='parent-name' placeholder='Enter full name' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='relationship'>Relationship</Label>
            <Select defaultValue='parent'>
              <SelectTrigger id='relationship'>
                <SelectValue placeholder='Select relationship' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='parent'>Parent</SelectItem>
                <SelectItem value='guardian'>Legal Guardian</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='parent-email'>Email Address</Label>
            <Input
              id='parent-email'
              type='email'
              placeholder='Enter email address'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='parent-phone'>Phone Number</Label>
            <Input
              id='parent-phone'
              type='tel'
              placeholder='Enter phone number'
              required
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='parent-address'>
            Address (if different from student)
          </Label>
          <Textarea id='parent-address' placeholder='Enter full address' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='emergency-contact'>Emergency Contact</Label>
          <Input
            id='emergency-contact'
            placeholder='Enter emergency contact name and number'
            required
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='button'>
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
