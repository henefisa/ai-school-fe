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
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface ContactProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const Contact: React.FC<ContactProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Enter the student's contact details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='address'>Address</Label>
          <Textarea id='address' placeholder='Enter full address' required />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='city'>City</Label>
            <Input id='city' placeholder='Enter city' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='state'>State/Province</Label>
            <Input id='state' placeholder='Enter state or province' required />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='postal-code'>Postal/Zip Code</Label>
            <Input id='postal-code' placeholder='Enter postal code' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='country'>Country</Label>
            <Input id='country' placeholder='Enter country' required />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              type='email'
              placeholder='Enter email address'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='Enter phone number'
              required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' type='button'>
          Previous
        </Button>
        <Button type='button'>Next</Button>
      </CardFooter>
    </Card>
  );
};
