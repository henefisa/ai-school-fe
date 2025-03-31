import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Download } from 'lucide-react';

export const Documents = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Documents</CardTitle>
        <CardDescription>
          Important documents related to this student
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-3'>
              <BookOpen className='h-5 w-5 text-muted-foreground' />
              <div>
                <p className='font-medium'>Enrollment Form</p>
                <p className='text-sm text-muted-foreground'>
                  Uploaded on Sep 1, 2022
                </p>
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </div>
          <div className='flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-3'>
              <BookOpen className='h-5 w-5 text-muted-foreground' />
              <div>
                <p className='font-medium'>Medical Records</p>
                <p className='text-sm text-muted-foreground'>
                  Uploaded on Sep 5, 2022
                </p>
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </div>
          <div className='flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-3'>
              <BookOpen className='h-5 w-5 text-muted-foreground' />
              <div>
                <p className='font-medium'>Previous School Records</p>
                <p className='text-sm text-muted-foreground'>
                  Uploaded on Sep 10, 2022
                </p>
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <BookOpen className='h-5 w-5 text-muted-foreground' />
              <div>
                <p className='font-medium'>Last Semester Report Card</p>
                <p className='text-sm text-muted-foreground'>
                  Uploaded on Jan 15, 2023
                </p>
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
