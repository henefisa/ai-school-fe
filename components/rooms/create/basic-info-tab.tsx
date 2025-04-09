'use client';

import { Building } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RoomStatus, RoomType } from '@/apis/rooms/type';
import type { UseFormReturn } from 'react-hook-form';
import type { RoomFormValues } from '@/app/dashboard/rooms/create/schema';

interface BasicInfoTabProps {
  form: UseFormReturn<RoomFormValues>;
  handleNext: () => void;
  isEdit?: boolean;
}

export function BasicInfoTab({
  form,
  handleNext,
  isEdit = false,
}: BasicInfoTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <Building className='h-6 w-6 text-primary' />
          <CardTitle>Room Information</CardTitle>
        </div>
        <CardDescription>
          {isEdit
            ? 'Update the basic details for this room. All fields marked with * are required.'
            : 'Enter the basic details for the new room. All fields marked with * are required.'}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name *</FormLabel>
                <FormControl>
                  <Input placeholder='Main Lecture Hall' {...field} />
                </FormControl>
                <FormDescription>
                  The descriptive name of the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='roomNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Number *</FormLabel>
                <FormControl>
                  <Input placeholder='101' {...field} />
                </FormControl>
                <FormDescription>
                  The unique identifier for the room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='building'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building *</FormLabel>
                <FormControl>
                  <Input placeholder='Main Building' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='capacity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity *</FormLabel>
                <FormControl>
                  <Input type='number' min='1' placeholder='30' {...field} />
                </FormControl>
                <FormDescription>
                  Maximum number of people the room can accommodate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='roomType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select room type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={RoomType.CLASS_ROOM}>
                      Classroom
                    </SelectItem>
                    <SelectItem value={RoomType.LAB}>Lab</SelectItem>
                    <SelectItem value={RoomType.OFFICE}>Office</SelectItem>
                    <SelectItem value={RoomType.AUDITORIUM}>
                      Auditorium
                    </SelectItem>
                    <SelectItem value={RoomType.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={RoomStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={RoomStatus.MAINTENANCE}>
                      Maintenance
                    </SelectItem>
                    <SelectItem value={RoomStatus.INACTIVE}>
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Current status of the room.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location *</FormLabel>
              <FormControl>
                <Input
                  placeholder='First floor, near the main entrance'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specific location details to help find the room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='This is a large lecture hall with tiered seating'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Additional notes about the room (e.g., accessibility features)'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button type='button' onClick={handleNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
