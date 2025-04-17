'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { FileUpload } from '@/components/upload/file-upload';
import { useUserProfile } from '@/apis/users';
import { useUpdateAvatar } from '@/apis/users/user-avatar';
import { getUrl } from '@/utils/getUrl';

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 characters.',
    })
    .max(15, {
      message: 'Phone number must not be longer than 15 characters.',
    })
    .regex(phoneRegex, {
      message: 'Phone number must contain only numbers and can start with +.',
    })
    .optional(),

  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER'], {
      message: 'Gender must be male, female, or other.',
    })
    .optional(),
  dob: z.date({ message: 'Please select a valid date.' }).optional(),
  bio: z
    .string()
    .max(160, {
      message: 'Bio must not be longer than 160 characters.',
    })
    .optional(),
  photoUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileSettings() {
  const { data: profile } = useUserProfile();
  const uploadAvatarMutation = useUpdateAvatar();
  const { toast } = useToast();

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const defaultValues: Partial<ProfileFormValues> = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    phone: '',
    gender: undefined,
    dob: undefined,
    photoUrl: '',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  function handleAvatarClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setIsUploading(true);
    setFileSelected(file);
    setIsUploading(false);
    toast({
      title: 'Avatar selected',
      description: 'Save changes to update your profile picture.',
    });
  }

  async function onSubmit(data: ProfileFormValues) {
    if (!data) return;

    try {
      if (fileSelected) {
        await uploadAvatarMutation.mutateAsync({
          avatar: fileSelected,
        });

        form.reset(defaultValues);
        setFileSelected(null);

        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated.',
        });
      }
    } catch (error) {
      toast({
        title: 'Update failed',
        variant: 'destructive',
        description:
          'An unexpected error occurred while updating your profile.',
      });
    }
  }

  useEffect(() => {
    form.reset({
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      gender: profile?.gender ?? 'OTHER',
      photoUrl: profile?.photoUrl ?? '',
      email: profile?.email,
      phone: profile?.phoneNumber ?? '',
      bio: '',
      dob: profile?.dob ? new Date(profile.dob) : undefined,
    });
  }, [profile]);

  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <FileUpload
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
        <div className='relative mb-4'>
          <Avatar className={cn('h-32 w-32')} onClick={handleAvatarClick}>
            <AvatarImage
              src={
                fileSelected
                  ? URL.createObjectURL(fileSelected)
                  : getUrl(profile?.photoUrl ?? '')
              }
              alt={`${profile?.firstName} ${profile?.lastName}`}
            />
            <AvatarFallback className='text-3xl'>
              {`${profile?.firstName} ${profile?.lastName}`}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-col space-y-2'>
          <h3 className='text-lg font-medium'>Profile Picture</h3>
          <div className='flex space-x-2'>
            <Button onClick={handleAvatarClick} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload New Picture'}
            </Button>
          </div>
          <p className='text-sm text-muted-foreground'>
            JPG, GIF or PNG. Max size of 2MB.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your first name' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public first name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your last name' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select your gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MALE'>Male</SelectItem>
                      <SelectItem value='FEMALE'>Female</SelectItem>
                      <SelectItem value='OTHER'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select your gender.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Your email' {...field} />
                </FormControl>
                <FormDescription>
                  This is the email address you use to log in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='Your phone number' {...field} />
                </FormControl>
                <FormDescription>
                  This is your contact phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us a little bit about yourself'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be displayed on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={!form.formState.isDirty && !fileSelected}
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
