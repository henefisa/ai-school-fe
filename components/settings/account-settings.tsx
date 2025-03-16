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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    newPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountSettings() {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: PasswordFormValues) {
    toast({
      title: 'Password updated',
      description: 'Your password has been updated.',
    });
    console.log(data);
    form.reset();
  }

  function handleTwoFactorToggle(checked: boolean) {
    toast({
      title: checked
        ? 'Two-factor authentication enabled'
        : 'Two-factor authentication disabled',
      description: checked
        ? 'Your account is now more secure.'
        : 'Your account is now less secure.',
    });
  }

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit'>Update Password</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='text-base font-medium'>
                Two-Factor Authentication
              </div>
              <div className='text-sm text-muted-foreground'>
                Protect your account with an additional security layer.
              </div>
            </div>
            <Switch onCheckedChange={handleTwoFactorToggle} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Deletion</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground mb-4'>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant='destructive'>Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
