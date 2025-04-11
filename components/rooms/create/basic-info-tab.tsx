'use client';

import { Building, Check, ChevronsUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RoomStatus, RoomType } from '@/apis/rooms/type';
import type { UseFormReturn } from 'react-hook-form';
import type { RoomFormValues } from '@/app/dashboard/rooms/create/schema';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BasicInfoTabProps {
  form: UseFormReturn<RoomFormValues>;
  isEdit?: boolean;
}

export const statusOptions = [
  { value: RoomStatus.ACTIVE, label: 'Active' },
  { value: RoomStatus.MAINTENANCE, label: 'Maintenance' },
  { value: RoomStatus.INACTIVE, label: 'Inactive' },
];

export const roomTypeOptions = [
  { value: RoomType.CLASS_ROOM, label: 'Classroom' },
  { value: RoomType.LAB, label: 'Lab' },
  { value: RoomType.OFFICE, label: 'Office' },
  { value: RoomType.AUDITORIUM, label: 'Auditorium' },
  { value: RoomType.OTHER, label: 'Other' },
];

export function BasicInfoTab({ form, isEdit = false }: BasicInfoTabProps) {
  const [openStatus, setOpenStatus] = useState(false);
  const [openRoomType, setOpenRoomType] = useState(false);

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
            name='basicInfo.name'
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
            name='basicInfo.roomNumber'
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
            name='basicInfo.building'
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
            name='basicInfo.capacity'
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
            name='basicInfo.roomType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type *</FormLabel>
                <FormControl>
                  <Popover open={openRoomType} onOpenChange={setOpenRoomType}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openRoomType}
                        className='w-full justify-between'
                      >
                        {field.value
                          ? roomTypeOptions.find(
                              (option) => option.value === field.value
                            )?.label
                          : 'Select room type'}
                        <ChevronsUpDown className='opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput placeholder='Search room type' />
                        <CommandList>
                          <CommandEmpty>No room type found.</CommandEmpty>
                          <CommandGroup>
                            {roomTypeOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue);
                                  setOpenRoomType(false);
                                }}
                              >
                                {option.label}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    field.value === option.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='basicInfo.status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <FormControl>
                  <Popover open={openStatus} onOpenChange={setOpenStatus}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openStatus}
                        className='w-full justify-between'
                      >
                        {field.value
                          ? statusOptions.find(
                              (option) => option.value === field.value
                            )?.label
                          : 'Select status'}
                        <ChevronsUpDown className='opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput placeholder='Search status' />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {statusOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue);
                                  setOpenStatus(false);
                                }}
                              >
                                {option.label}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    field.value === option.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>Current status of the room.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='basicInfo.location'
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
          name='basicInfo.description'
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
          name='basicInfo.notes'
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
    </Card>
  );
}
