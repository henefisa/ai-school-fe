'use client';

import { Plus, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { UseFormReturn } from 'react-hook-form';
import type { RoomFormValues } from '@/app/dashboard/rooms/create/schema';
import type { OperationalHours } from '@/apis/rooms/type';

interface ScheduleTabProps {
  form: UseFormReturn<RoomFormValues>;
}

export function ScheduleTab({ form }: ScheduleTabProps) {
  const addTimeSlot = (day: keyof OperationalHours) => {
    const currentHours = form.getValues('operationalHours');
    const daySlots = [...(currentHours[day] || [])];

    let newStart = '08:00';
    let newEnd = '09:00';

    if (daySlots.length > 0) {
      const sortedSlots = [...daySlots].sort((a, b) =>
        a.start.localeCompare(b.start)
      );
      const lastSlot = sortedSlots[sortedSlots.length - 1];

      newStart = lastSlot.end;

      const [hours, minutes] = lastSlot.end.split(':').map(Number);
      const endHour = hours + 1 > 23 ? 23 : hours + 1;
      newEnd = `${endHour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    }

    daySlots.push({ start: newStart, end: newEnd });

    form.setValue(`operationalHours.${day}`, daySlots, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const removeTimeSlot = (day: keyof OperationalHours, index: number) => {
    const currentHours = form.getValues('operationalHours');
    const daySlots = [...(currentHours[day] || [])];

    daySlots.splice(index, 1);

    form.setValue(`operationalHours.${day}`, daySlots, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const hasDayErrors = (day: keyof OperationalHours) => {
    return !!form.formState.errors.operationalHours?.[day];
  };

  const getDayErrorMessage = (day: keyof OperationalHours) => {
    const error = form.formState.errors.operationalHours?.[day];
    return (error?.message as string) || 'Invalid time slots';
  };

  const hasTimeSlotError = (
    day: keyof OperationalHours,
    index: number,
    field: 'start' | 'end'
  ) => {
    return !!form.formState.errors.operationalHours?.[day]?.[index]?.[field];
  };

  const getTimeSlotErrorMessage = (
    day: keyof OperationalHours,
    index: number,
    field: 'start' | 'end'
  ) => {
    return form.formState.errors.operationalHours?.[day]?.[index]?.[field]
      ?.message as string;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operational Hours</CardTitle>
        <CardDescription>
          Set the hours when this room is available for use.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {(
          [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ] as const
        ).map((day) => (
          <div key={day} className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-medium capitalize'>{day}</h3>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addTimeSlot(day);
                }}
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Time Slot
              </Button>
            </div>

            {hasDayErrors(day) && (
              <Alert variant='destructive' className='mb-2'>
                <AlertDescription>{getDayErrorMessage(day)}</AlertDescription>
              </Alert>
            )}

            {form.watch(`operationalHours.${day}`)?.length === 0 ? (
              <p className='text-sm text-muted-foreground'>
                No operational hours set for this day.
              </p>
            ) : (
              form.watch(`operationalHours.${day}`).map((_, index) => (
                <div
                  key={index}
                  className='grid grid-cols-1 gap-4 md:grid-cols-2 items-end border rounded-md p-4'
                >
                  <FormField
                    control={form.control}
                    name={`operationalHours.${day}.${index}.start` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type='time'
                            {...field}
                            className={
                              hasTimeSlotError(day, index, 'start')
                                ? 'border-destructive'
                                : ''
                            }
                          />
                        </FormControl>
                        {hasTimeSlotError(day, index, 'start') && (
                          <FormMessage>
                            {getTimeSlotErrorMessage(day, index, 'start')}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`operationalHours.${day}.${index}.end` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <div className='flex space-x-2'>
                          <FormControl>
                            <Input
                              type='time'
                              {...field}
                              className={
                                hasTimeSlotError(day, index, 'end')
                                  ? 'border-destructive'
                                  : ''
                              }
                            />
                          </FormControl>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeTimeSlot(day, index);
                            }}
                          >
                            <Trash2 className='h-4 w-4 text-destructive' />
                          </Button>
                        </div>
                        {hasTimeSlotError(day, index, 'end') && (
                          <FormMessage>
                            {getTimeSlotErrorMessage(day, index, 'end')}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              ))
            )}
            <Separator className='my-2' />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
