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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import type { formSchema } from '@/app/dashboard/teachers/create/schema';
import { Loader2 } from 'lucide-react';

interface ClassesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  handlePrevious: () => void;
  isSubmitting: boolean;
}

const availableClasses = [
  { id: 'algebra-10a', label: 'Algebra I (10A)' },
  { id: 'algebra-10b', label: 'Algebra I (10B)' },
  { id: 'calculus-12a', label: 'Calculus (12A)' },
  { id: 'geometry-11b', label: 'Geometry (11B)' },
];

export function Classes({ form, handlePrevious, isSubmitting }: ClassesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes & Schedule</CardTitle>
        <CardDescription>
          Assign classes and schedule for the teacher
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormField
          control={form.control}
          name='classes.assignedClasses'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Assign Classes</FormLabel>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {availableClasses.map((item) => (
                  <FormItem
                    key={item.id}
                    className='flex flex-row items-start space-x-3 space-y-0'
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), item.id]
                            : (field.value || []).filter(
                                (value) => value !== item.id
                              );
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className='font-normal'>{item.label}</FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='classes.maxClasses'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Maximum Classes</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select maximum classes' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='3'>3 Classes</SelectItem>
                  <SelectItem value='4'>4 Classes</SelectItem>
                  <SelectItem value='5'>5 Classes</SelectItem>
                  <SelectItem value='6'>6 Classes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <FormLabel>Preferred Schedule</FormLabel>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='classes.preferredDays'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Preferred Days</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select preferred days' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='all'>All Weekdays</SelectItem>
                      <SelectItem value='mwf'>
                        Monday, Wednesday, Friday
                      </SelectItem>
                      <SelectItem value='tth'>Tuesday, Thursday</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='classes.preferredTime'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select preferred time' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='morning'>Morning</SelectItem>
                      <SelectItem value='afternoon'>Afternoon</SelectItem>
                      <SelectItem value='all-day'>All Day</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name='classes.additionalResponsibilities'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Additional Responsibilities (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Enter any additional responsibilities'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='classes.notes'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Enter any additional notes' />
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
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creating...
            </>
          ) : (
            'Create Teacher'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
