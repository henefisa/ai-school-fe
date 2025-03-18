'use client';

import { useState } from 'react';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

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
  const { user } = useAuth();
  const supabase = createClient();
  const { toast } = useToast();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: PasswordFormValues) {
    if (!user?.email) return;

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: values.currentPassword,
      });

      if (signInError) {
        toast({
          title: 'Password verification failed',
          description: 'The current password you entered is incorrect.',
          variant: 'destructive',
        });

        form.setError('currentPassword', {
          message: 'Current password is incorrect',
        });
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (updateError) {
        toast({
          title: 'Update failed',
          description:
            updateError.message ||
            'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });

        return;
      }
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
      form.reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
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
    <div className='w-full max-w-3xl mx-auto'>
      <Accordion type='single' collapsible className='w-full space-y-4'>
        <AccordionItem
          value='change-password'
          className='border rounded-lg shadow-sm overflow-hidden'
        >
          <AccordionTrigger className='px-6 py-4 hover:bg-muted/50 transition-all'>
            <div className='flex items-center gap-3'>
              <Lock className='h-5 w-5 text-primary' />
              <div className='text-left'>
                <h3 className='text-lg font-medium'>Change Password</h3>
                <p className='text-sm text-muted-foreground'>
                  Update your password to keep your account secure.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-6 pt-2'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='currentPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <div className='relative'>
                        <FormControl>
                          <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            className='pr-10'
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-1 top-1 h-8 w-8'
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                          <span className='sr-only'>
                            {showCurrentPassword
                              ? 'Hide password'
                              : 'Show password'}
                          </span>
                        </Button>
                      </div>
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
                      <div className='relative'>
                        <FormControl>
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            className='pr-10'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-1 top-1 h-8 w-8'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                          <span className='sr-only'>
                            {showNewPassword
                              ? 'Hide password'
                              : 'Show password'}
                          </span>
                        </Button>
                      </div>
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
                      <div className='relative'>
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='••••••••'
                            className='pr-10'
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-1 top-1 h-8 w-8'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                          <span className='sr-only'>
                            {showConfirmPassword
                              ? 'Hide password'
                              : 'Show password'}
                          </span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='mt-2'>
                  Update Password
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value='two-factor'
          className='border rounded-lg shadow-sm overflow-hidden'
        >
          <AccordionTrigger className='px-6 py-4 hover:bg-muted/50 transition-all'>
            <div className='flex items-center gap-3'>
              <ShieldCheck className='h-5 w-5 text-primary' />
              <div className='text-left'>
                <h3 className='text-lg font-medium'>
                  Two-Factor Authentication
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Add an extra layer of security to your account.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-6 pt-2'>
            <div className='flex flex-row items-center justify-between rounded-lg border p-4 bg-card'>
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
            <div className='mt-4 text-sm text-muted-foreground'>
              <p>
                When enabled, you'll be required to enter a code from your
                authenticator app when logging in.
              </p>
              <div className='mt-4 space-y-2'>
                <h4 className='font-medium'>
                  Benefits of Two-Factor Authentication:
                </h4>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>Adds an extra layer of security to your account</li>
                  <li>Protects against password theft and phishing attacks</li>
                  <li>
                    Prevents unauthorized access even if your password is
                    compromised
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
