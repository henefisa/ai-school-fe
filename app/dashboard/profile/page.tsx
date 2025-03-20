'use client';

import { ChangeEvent, use, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Pencil1Icon,
  CheckIcon,
  Cross1Icon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getDisplayName } from '@/utils/get-display-name';
import { getProfileById } from '@/queries/profile/get-profile-by-id';
import {
  useQuery,
  useRevalidateTables,
} from '@supabase-cache-helpers/postgrest-react-query';
import { createClient } from '@/utils/supabase/client';
import { useUpload } from '@supabase-cache-helpers/storage-react-query';
import { nanoid } from 'nanoid';
import { Loader2, SaveIcon } from 'lucide-react';
import { AuthContext } from '@/contexts/auth';

// Define the form schema
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'State must be at least 2 characters.',
  }),
  zipCode: z.string().min(5, {
    message: 'Zip code must be at least 5 characters.',
  }),
  bio: z.string().optional(),
  emergencyContact: z.string().min(10, {
    message: 'Emergency contact must be at least 10 digits.',
  }),
  emergencyName: z.string().min(2, {
    message: 'Emergency contact name must be at least 2 characters.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user } = use(AuthContext);
  const supabase = createClient();
  const { toast } = useToast();
  const { data: profile } = useQuery(getProfileById(supabase, user?.id ?? ''), {
    enabled: !!user?.id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected, setFileSelected] = useState<File>();
  const revalidateTables = useRevalidateTables([
    { schema: 'public', table: 'profiles' },
  ]);

  const { mutateAsync: upload } = useUpload(supabase.storage.from('avatars'), {
    buildFileName: () => `${user?.id}/${nanoid()}`,
  });

  const defaultValues: Partial<ProfileFormValues> = {
    name: getDisplayName(profile),
    email: user?.email || '',
    phone: '(555) 123-4567',
    dob: new Date('1990-01-01'),
    address: '123 School Street',
    city: 'Education City',
    state: 'Learning State',
    zipCode: '12345',
    bio: 'I am passionate about education and helping students reach their full potential.',
    emergencyContact: '(555) 987-6543',
    emergencyName: 'Emergency Contact',
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(values: ProfileFormValues) {}

  function handleCancel() {
    form.reset(defaultValues);

    setIsEditing(false);
  }

  function handleAvatarClick() {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setFileSelected(file);
    setIsUploading(false);
    toast({
      title: 'Avatar selected',
      description: 'Save changes to update your profile picture.',
    });
  }

  async function handleUploadAvatar() {
    try {
      if (!user || !fileSelected) return;

      const response = await upload({
        files: [fileSelected],
      });

      const { data: dataUpload, error: errorUpload } = response[0];

      if (errorUpload) {
        toast({
          title: 'Upload failed',
          variant: 'destructive',
          description:
            errorUpload.message ??
            'An error occurred while uploading your avatar.',
        });
        return;
      }

      const { data: urlData } = await supabase.storage
        .from('avatars')
        .getPublicUrl(dataUpload.path);

      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.publicUrl })
        .eq('id', user.id);

      if (error) {
        toast({
          title: 'Update failed',
          variant: 'destructive',
          description:
            error.message ?? 'An error occurred while updating your profile.',
        });
        return;
      }

      revalidateTables();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });

      setIsEditing(false);
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
    form.reset(defaultValues);
  }, [user, profile]);

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
          <p className='text-muted-foreground'>
            View and manage your personal information
          </p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className='gap-2'>
            <Pencil1Icon className='h-4 w-4' />
            Edit Profile
          </Button>
        )}
      </div>

      <div className='grid gap-6 md:grid-cols-[1fr_3fr]'>
        {/* Profile Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col items-center'>
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
            <div className='relative mb-4'>
              <Avatar
                className={cn(
                  'h-32 w-32',
                  isEditing &&
                    'cursor-pointer hover:opacity-80 transition-opacity'
                )}
                onClick={handleAvatarClick}
              >
                <AvatarImage
                  src={
                    fileSelected
                      ? URL.createObjectURL(fileSelected)
                      : profile?.avatar_url ?? ''
                  }
                  alt={getDisplayName(profile)}
                />
                <AvatarFallback className='text-3xl'>
                  {getDisplayName(profile)[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size='icon'
                  variant='outline'
                  className='absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background shadow-sm'
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <span className='animate-spin'>↻</span>
                  ) : (
                    <UploadIcon className='h-4 w-4' />
                  )}
                  <span className='sr-only'>Upload new picture</span>
                </Button>
              )}
            </div>
            <div className='text-center'>
              <h3 className='text-xl font-semibold'>
                {getDisplayName(profile)}
              </h3>
              {isEditing && (
                <p className='text-xs text-muted-foreground mt-2'>
                  Click on the avatar to change
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col items-stretch gap-2'>
            <div className='grid grid-cols-2 gap-2 text-center'>
              <div className='rounded-md bg-muted p-2'>
                <p className='text-sm font-medium'>ID</p>
                <p className='text-xs text-muted-foreground'>
                  {user?.id || '001'}
                </p>
              </div>
              <div className='rounded-md bg-muted p-2'>
                <p className='text-sm font-medium'>Status</p>
                <p className='text-xs text-muted-foreground'>Active</p>
              </div>
            </div>
            {isEditing && (
              <div className='flex justify-center mt-4'>
                <Button
                  className='w-full'
                  onClick={handleUploadAvatar}
                  disabled={isUploading}
                >
                  <SaveIcon className='mr-2 h-4 w-4' />
                  Save Changes
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
        {/* Profile Form */}
        <div className='space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input
                                placeholder='Enter your full name'
                                {...field}
                              />
                            ) : (
                              <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                {field.value}
                              </div>
                            )}
                          </FormControl>
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
                            {isEditing ? (
                              <Input
                                placeholder='Enter your email'
                                {...field}
                              />
                            ) : (
                              <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                {field.value}
                              </div>
                            )}
                          </FormControl>
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
                            {isEditing ? (
                              <Input
                                placeholder='Enter your phone number'
                                {...field}
                              />
                            ) : (
                              <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                {field.value}
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='dob'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                {isEditing ? (
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
                                ) : (
                                  <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                    {field.value
                                      ? format(field.value, 'PPP')
                                      : 'Not set'}
                                  </div>
                                )}
                              </FormControl>
                            </PopoverTrigger>
                            {isEditing && (
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            )}
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Address</h3>
                    <FormField
                      control={form.control}
                      name='address'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Input
                                placeholder='Enter your street address'
                                {...field}
                              />
                            ) : (
                              <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                {field.value}
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid gap-4 md:grid-cols-3'>
                      <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Input
                                  placeholder='Enter your city'
                                  {...field}
                                />
                              ) : (
                                <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                  {field.value}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='state'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Input
                                  placeholder='Enter your state'
                                  {...field}
                                />
                              ) : (
                                <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                  {field.value}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='zipCode'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Input
                                  placeholder='Enter your zip code'
                                  {...field}
                                />
                              ) : (
                                <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                  {field.value}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>
                      Additional Information
                    </h3>
                    <FormField
                      control={form.control}
                      name='bio'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            {isEditing ? (
                              <Textarea
                                placeholder='Tell us a little about yourself'
                                className='resize-none'
                                {...field}
                              />
                            ) : (
                              <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                {field.value || 'No bio provided'}
                              </div>
                            )}
                          </FormControl>
                          <FormDescription>
                            A brief description about yourself that will be
                            visible to others.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Emergency Contact</h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <FormField
                        control={form.control}
                        name='emergencyName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Input
                                  placeholder='Enter emergency contact name'
                                  {...field}
                                />
                              ) : (
                                <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                  {field.value}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='emergencyContact'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Number</FormLabel>
                            <FormControl>
                              {isEditing ? (
                                <Input
                                  placeholder='Enter emergency contact number'
                                  {...field}
                                />
                              ) : (
                                <div className='rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm'>
                                  {field.value}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter className='flex justify-end gap-2'>
                    <Button
                      variant='outline'
                      type='button'
                      onClick={handleCancel}
                    >
                      <Cross1Icon className='mr-2 h-4 w-4' />
                      Cancel
                    </Button>
                    <Button type='submit'>
                      <CheckIcon className='mr-2 h-4 w-4' />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </form>
          </Form>

          {/* Additional Cards for other profile sections could go here */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='font-medium'>Password</h4>
                  <p className='text-sm text-muted-foreground'>
                    Change your account password
                  </p>
                </div>
                <Button variant='outline'>Change Password</Button>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='font-medium'>Two-Factor Authentication</h4>
                  <p className='text-sm text-muted-foreground'>
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant='outline'>Enable</Button>
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <div>
                  <h4 className='font-medium'>Notifications</h4>
                  <p className='text-sm text-muted-foreground'>
                    Manage your notification preferences
                  </p>
                </div>
                <Button variant='outline'>Configure</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
