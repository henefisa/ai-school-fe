'use client';

import type React from 'react';

import { TableCell } from '@/components/ui/table';

import { TableBody } from '@/components/ui/table';

import { TableHead } from '@/components/ui/table';

import { TableRow } from '@/components/ui/table';

import { TableHeader } from '@/components/ui/table';

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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const systemFormSchema = z.object({
  schoolName: z.string().min(2, {
    message: 'School name must be at least 2 characters.',
  }),
  schoolEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  schoolPhone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  schoolAddress: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  academicYear: z.string().min(4, {
    message: 'Academic year must be at least 4 characters.',
  }),
  maintenanceMode: z.boolean().default(false),
  allowRegistration: z.boolean().default(true),
  backupFrequency: z.string().default('daily'),
});

type SystemFormValues = z.infer<typeof systemFormSchema>;

const defaultValues: Partial<SystemFormValues> = {
  schoolName: 'EduManage Academy',
  schoolEmail: 'info@edumanage.example',
  schoolPhone: '1234567890',
  schoolAddress: '123 Education St, Learning City',
  academicYear: '2023-2024',
  maintenanceMode: false,
  allowRegistration: true,
  backupFrequency: 'daily',
};

export default function SystemSettings() {
  const form = useForm<SystemFormValues>({
    resolver: zodResolver(systemFormSchema),
    defaultValues,
  });

  function onSubmit(data: SystemFormValues) {
    toast({
      title: 'System settings updated',
      description: 'Your system settings have been updated.',
    });
    console.log(data);
  }

  function handleBackupNow() {
    toast({
      title: 'Backup initiated',
      description:
        'System backup has been initiated. This may take a few minutes.',
    });
  }

  function handleRestoreBackup() {
    toast({
      title: 'Restore initiated',
      description:
        'System restore has been initiated. This may take a few minutes.',
    });
  }

  return (
    <div className='space-y-6'>
      <Tabs defaultValue='general'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='backup'>Backup & Restore</TabsTrigger>
          <TabsTrigger value='api'>API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value='general' className='mt-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>School Information</CardTitle>
                  <CardDescription>
                    Update your school's basic information.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='schoolName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='schoolEmail'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='schoolPhone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='schoolAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='academicYear'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system-wide settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='maintenanceMode'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Maintenance Mode
                          </FormLabel>
                          <FormDescription>
                            When enabled, only administrators can access the
                            system.
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
                    name='allowRegistration'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                        <div className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            Allow Registration
                          </FormLabel>
                          <FormDescription>
                            When enabled, new users can register for accounts.
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
                </CardContent>
                <CardFooter>
                  <Button type='submit'>Save Changes</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value='backup' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>
                Configure automatic backups and restore from previous backups.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='backupFrequency'>Backup Frequency</Label>
                <Select
                  defaultValue='daily'
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger id='backupFrequency'>
                    <SelectValue placeholder='Select frequency' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='hourly'>Hourly</SelectItem>
                    <SelectItem value='daily'>Daily</SelectItem>
                    <SelectItem value='weekly'>Weekly</SelectItem>
                    <SelectItem value='monthly'>Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='backupRetention'>Backup Retention</Label>
                <Select
                  defaultValue='30'
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger id='backupRetention'>
                    <SelectValue placeholder='Select retention period' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='7'>7 days</SelectItem>
                    <SelectItem value='14'>14 days</SelectItem>
                    <SelectItem value='30'>30 days</SelectItem>
                    <SelectItem value='90'>90 days</SelectItem>
                    <SelectItem value='365'>365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex space-x-2'>
                <Button onClick={handleBackupNow}>Backup Now</Button>
                <Button variant='outline' onClick={handleRestoreBackup}>
                  Restore from Backup
                </Button>
              </div>

              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2023-08-15 12:00 PM</TableCell>
                      <TableCell>256 MB</TableCell>
                      <TableCell>
                        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800'>
                          Completed
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='ghost' size='sm'>
                          Restore
                        </Button>
                        <Button variant='ghost' size='sm'>
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2023-08-14 12:00 PM</TableCell>
                      <TableCell>255 MB</TableCell>
                      <TableCell>
                        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800'>
                          Completed
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='ghost' size='sm'>
                          Restore
                        </Button>
                        <Button variant='ghost' size='sm'>
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2023-08-13 12:00 PM</TableCell>
                      <TableCell>254 MB</TableCell>
                      <TableCell>
                        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800'>
                          Completed
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='ghost' size='sm'>
                          Restore
                        </Button>
                        <Button variant='ghost' size='sm'>
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='api' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for external integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>
                        Student Portal API
                      </TableCell>
                      <TableCell>2023-07-15</TableCell>
                      <TableCell>2023-08-14</TableCell>
                      <TableCell className='text-right'>
                        <Button variant='ghost' size='sm'>
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>
                        Mobile App API
                      </TableCell>
                      <TableCell>2023-06-10</TableCell>
                      <TableCell>2023-08-15</TableCell>
                      <TableCell className='text-right'>
                        <Button variant='ghost' size='sm'>
                          Revoke
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className='flex items-center space-x-2'>
                <Input placeholder='New API Key Name' />
                <Button>Generate New Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    >
      {children}
    </label>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return <table className='w-full caption-bottom text-sm'>{children}</table>;
}
