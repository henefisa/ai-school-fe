import { studentSchema } from '@/app/dashboard/students/[id]/schema';
import { SingleDatePicker } from '@/components/date-picker/single-date-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
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
import * as z from 'zod';

interface DialogFormProps {
  form: UseFormReturn<z.infer<typeof studentSchema>>;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<typeof studentSchema>) => Promise<void>;
}

export const DialogForm: React.FC<DialogFormProps> = ({
  form,
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit student profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='firstName'
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
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter last name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dob'
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
                name='gender'
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
              <FormField
                control={form.control}
                name='email'
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
                name='contactNumber'
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
              <FormField
                control={form.control}
                name='enrollmentDate'
                render={({ field }) => (
                  <SingleDatePicker field={field} label='Enrollment Date' />
                )}
              />
            </div>
            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
