'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@/app/dashboard/teachers/create/schema';

interface ContactProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handleNext: () => Promise<void>;
  handlePrevious: () => void;
}

export function Contact({ form, handleNext, handlePrevious }: ContactProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Enter the teacher's contact details</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormField
          control={form.control}
          name='contact.addressLine1'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Enter street address'
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='contact.addressLine2'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Apartment, suite, unit, etc.' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='contact.city'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter city' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact.state'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Enter state or province'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='contact.zipCode'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Postal/Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter postal code' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact.country'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter country' required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='contact.email'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Enter email address'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contact.phoneNumber'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='tel'
                    placeholder='Enter phone number'
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='contact.emergencyContact'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter emergency contact name and number'
                  required
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
        <Button type='button' onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
