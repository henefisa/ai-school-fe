'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const generalFormSchema = z.object({
  language: z.string({
    required_error: 'Please select a language.',
  }),
  timezone: z.string({
    required_error: 'Please select a timezone.',
  }),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

const defaultValues: Partial<GeneralFormValues> = {
  language: 'en',
  timezone: 'UTC',
  emailNotifications: true,
  pushNotifications: false,
};

export default function GeneralSettings() {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
  });

  function onSubmit(data: GeneralFormValues) {
    toast({
      title: 'Settings updated',
      description: 'Your general settings have been updated.',
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a language' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='en'>English</SelectItem>
                  <SelectItem value='es'>Spanish</SelectItem>
                  <SelectItem value='fr'>French</SelectItem>
                  <SelectItem value='de'>German</SelectItem>
                  <SelectItem value='zh'>Chinese</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the language that will be used throughout the
                application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='timezone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a timezone' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='UTC'>UTC</SelectItem>
                  <SelectItem value='EST'>
                    Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value='CST'>
                    Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value='MST'>
                    Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value='PST'>
                    Pacific Standard Time (PST)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the timezone that will be used for displaying dates and
                times.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='emailNotifications'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Email Notifications</FormLabel>
                <FormDescription>
                  Receive email notifications for important updates.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='pushNotifications'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Push Notifications</FormLabel>
                <FormDescription>
                  Receive push notifications for important updates.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Save Changes</Button>
      </form>
    </Form>
  );
}
