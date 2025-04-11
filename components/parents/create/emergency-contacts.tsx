import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';

interface EmergencyContactsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function EmergencyContacts({ form }: EmergencyContactsProps) {
  const addEmergencyContact = () => {
    const currentContacts = form.getValues('emergencyContacts');
    form.setValue('emergencyContacts', [
      ...currentContacts,
      { name: '', relationship: '', phoneNumber: '', email: '' },
    ]);
  };

  const removeEmergencyContact = (index: number) => {
    const currentContacts = form.getValues('emergencyContacts');
    if (currentContacts.length > 1) {
      form.setValue(
        'emergencyContacts',
        currentContacts.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>
          Add emergency contacts for this parent
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {form.watch('emergencyContacts').map((_, index) => (
          <div key={index} className='space-y-4'>
            {index > 0 && <Separator className='my-4' />}
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-medium'>Contact {index + 1}</h3>
              {form.watch('emergencyContacts').length > 1 && (
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => removeEmergencyContact(index)}
                >
                  <Trash2 className='h-4 w-4 mr-1' />
                  Remove
                </Button>
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name={`emergencyContacts.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Sarah Smith' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`emergencyContacts.${index}.relationship`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder='Spouse' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`emergencyContacts.${index}.phoneNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='+1 (555) 987-6543' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`emergencyContacts.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='sarah.smith@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={addEmergencyContact}
          className='mt-2'
        >
          <Plus className='h-4 w-4 mr-1' />
          Add Another Contact
        </Button>
      </CardContent>
    </Card>
  );
}
