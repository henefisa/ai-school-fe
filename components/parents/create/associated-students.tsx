import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/app/dashboard/parents/create/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface AssociatedStudentsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function AssociatedStudents({ form }: AssociatedStudentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Associated Students</CardTitle>
        <CardDescription>
          Link this parent to existing students or create new ones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            After creating this parent, you can associate them with students
            from the student management page.
          </p>
          <FormField
            control={form.control}
            name='createStudentAfter'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Create a new student after saving</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
