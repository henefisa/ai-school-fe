'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CreateStudentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to create student
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/students');
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/students'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Student</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-4'
        >
          <TabsList>
            <TabsTrigger value='personal'>Personal Information</TabsTrigger>
            <TabsTrigger value='contact'>Contact Information</TabsTrigger>
            <TabsTrigger value='academic'>Academic Information</TabsTrigger>
            <TabsTrigger value='parent'>Parent/Guardian</TabsTrigger>
          </TabsList>

          <TabsContent value='personal' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter the student's basic personal information
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='first-name'>First Name</Label>
                    <Input
                      id='first-name'
                      placeholder='Enter first name'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='last-name'>Last Name</Label>
                    <Input
                      id='last-name'
                      placeholder='Enter last name'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='date-of-birth'>Date of Birth</Label>
                    <Input type='date' id='date-of-birth' required />
                  </div>
                  <div className='space-y-2'>
                    <Label>Gender</Label>
                    <RadioGroup defaultValue='female' className='flex gap-4'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='male' id='male' />
                        <Label htmlFor='male'>Male</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='female' id='female' />
                        <Label htmlFor='female'>Female</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='other' id='other' />
                        <Label htmlFor='other'>Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='student-id'>Student ID (Optional)</Label>
                  <Input
                    id='student-id'
                    placeholder='Will be auto-generated if left blank'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='photo'>Photo (Optional)</Label>
                  <Input id='photo' type='file' accept='image/*' />
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline' type='button' disabled>
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('contact')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='contact' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Enter the student's contact details
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Textarea
                    id='address'
                    placeholder='Enter full address'
                    required
                  />
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input id='city' placeholder='Enter city' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>State/Province</Label>
                    <Input
                      id='state'
                      placeholder='Enter state or province'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='postal-code'>Postal/Zip Code</Label>
                    <Input
                      id='postal-code'
                      placeholder='Enter postal code'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='country'>Country</Label>
                    <Input id='country' placeholder='Enter country' required />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter email address'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='Enter phone number'
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('personal')}
                >
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('academic')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='academic' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                  Enter the student's academic details
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='grade'>Grade/Class</Label>
                    <Select defaultValue='10A'>
                      <SelectTrigger id='grade'>
                        <SelectValue placeholder='Select grade' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='9A'>Grade 9A</SelectItem>
                        <SelectItem value='9B'>Grade 9B</SelectItem>
                        <SelectItem value='10A'>Grade 10A</SelectItem>
                        <SelectItem value='10B'>Grade 10B</SelectItem>
                        <SelectItem value='11A'>Grade 11A</SelectItem>
                        <SelectItem value='11B'>Grade 11B</SelectItem>
                        <SelectItem value='12A'>Grade 12A</SelectItem>
                        <SelectItem value='12B'>Grade 12B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='enrollment-date'>Enrollment Date</Label>
                    <Input type='date' id='enrollment-date' required />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='previous-school'>
                      Previous School (Optional)
                    </Label>
                    <Input
                      id='previous-school'
                      placeholder='Enter previous school name'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='academic-year'>Academic Year</Label>
                    <Select defaultValue='2024-2025'>
                      <SelectTrigger id='academic-year'>
                        <SelectValue placeholder='Select academic year' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='2023-2024'>2023-2024</SelectItem>
                        <SelectItem value='2024-2025'>2024-2025</SelectItem>
                        <SelectItem value='2025-2026'>2025-2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='additional-notes'>
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id='additional-notes'
                    placeholder='Enter any additional academic information'
                  />
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('contact')}
                >
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('parent')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='parent' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Parent/Guardian Information</CardTitle>
                <CardDescription>
                  Enter the student's parent or guardian details
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='parent-name'>Parent/Guardian Name</Label>
                    <Input
                      id='parent-name'
                      placeholder='Enter full name'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='relationship'>Relationship</Label>
                    <Select defaultValue='parent'>
                      <SelectTrigger id='relationship'>
                        <SelectValue placeholder='Select relationship' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='parent'>Parent</SelectItem>
                        <SelectItem value='guardian'>Legal Guardian</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='parent-email'>Email Address</Label>
                    <Input
                      id='parent-email'
                      type='email'
                      placeholder='Enter email address'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='parent-phone'>Phone Number</Label>
                    <Input
                      id='parent-phone'
                      type='tel'
                      placeholder='Enter phone number'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='parent-address'>
                    Address (if different from student)
                  </Label>
                  <Textarea
                    id='parent-address'
                    placeholder='Enter full address'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='emergency-contact'>Emergency Contact</Label>
                  <Input
                    id='emergency-contact'
                    placeholder='Enter emergency contact name and number'
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('academic')}
                >
                  Previous
                </Button>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Creating...
                    </>
                  ) : (
                    'Create Student'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
