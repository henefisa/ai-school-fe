import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format, formatDate } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar, CalendarProps } from '../ui/calendar';

export interface SingleDatePickerProps {
  field: any;
  label?: string;
  description?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  /**
   * Enabled by default. If set to false, the field will return a Date object instead of a string.
   */
  stringMode?: boolean;
  CalendarProps?: CalendarProps;
}

export const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  field,
  label,
  description,
  disabled,
  placeholder,
  stringMode = true,
  CalendarProps,
}) => {
  return (
    <FormItem className='flex flex-col'>
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'min-w-[180px] pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
              disabled={disabled}
            >
              {field.value ? (
                format(field.value, 'd LLL y')
              ) : (
                <span>{placeholder || 'Pick a date'}</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            {...CalendarProps}
            mode='single'
            selected={
              typeof field.value === 'string'
                ? new Date(field.value)
                : field.value
            }
            onSelect={
              stringMode
                ? (day) => field.onChange(day && formatDate(day, 'yyyy-MM-dd'))
                : field.onChange
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <input
        type='hidden'
        name={field.name}
        value={
          stringMode
            ? field.value
            : field.value
            ? formatDate(field.value, 'yyyy-MM-dd')
            : undefined
        }
      />
      <FormMessage />
    </FormItem>
  );
};
