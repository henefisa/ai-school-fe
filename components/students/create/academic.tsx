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
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface AcademicProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const Academic: React.FC<AcademicProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
        <CardDescription>Enter the student's academic details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='grade'>Grade/Class</Label>
            <Select defaultValue='10A'>
              <SelectTrigger id='grade'>
                <SelectValue placeholder='Select grade' />
              </SelectTrigger>
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
          </div>
          <div className='space-y-2'>
            <Label htmlFor='enrollment-date'>Enrollment Date</Label>
            <Input type='date' id='enrollment-date' required />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='previous-school'>Previous School (Optional)</Label>
            <Input
              id='previous-school'
              placeholder='Enter previous school name'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='academic-year'>Academic Year</Label>
            <Select defaultValue='2024-2025'>
              <SelectTrigger id='academic-year'>
                <SelectValue placeholder='Select academic year' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='2023-2024'>2023-2024</SelectItem>
                <SelectItem value='2024-2025'>2024-2025</SelectItem>
                <SelectItem value='2025-2026'>2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='additional-notes'>Additional Notes (Optional)</Label>
          <Textarea
            id='additional-notes'
            placeholder='Enter any additional academic information'
          />
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
