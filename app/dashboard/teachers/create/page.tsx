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

export default function CreateTeacherPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to create teacher
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/teachers');
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/teachers'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Teacher</h1>
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
            <TabsTrigger value='professional'>
              Professional Information
            </TabsTrigger>
            <TabsTrigger value='classes'>Classes & Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value='personal' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Enter the teacher's basic personal information
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='title'>Title</Label>
                    <Select defaultValue='dr'>
                      <SelectTrigger id='title'>
                        <SelectValue placeholder='Select title' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='mr'>Mr.</SelectItem>
                        <SelectItem value='mrs'>Mrs.</SelectItem>
                        <SelectItem value='ms'>Ms.</SelectItem>
                        <SelectItem value='dr'>Dr.</SelectItem>
                        <SelectItem value='prof'>Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='employee-id'>Employee ID (Optional)</Label>
                    <Input
                      id='employee-id'
                      placeholder='Will be auto-generated if left blank'
                    />
                  </div>
                </div>

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
                    <RadioGroup defaultValue='male' className='flex gap-4'>
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
                  Enter the teacher's contact details
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
                  onClick={() => setActiveTab('personal')}
                >
                  Previous
                </Button>
                <Button
                  type='button'
                  onClick={() => setActiveTab('professional')}
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='professional' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Enter the teacher's professional details
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='department'>Department</Label>
                    <Select defaultValue='mathematics'>
                      <SelectTrigger id='department'>
                        <SelectValue placeholder='Select department' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='mathematics'>Mathematics</SelectItem>
                        <SelectItem value='english'>English</SelectItem>
                        <SelectItem value='science'>Science</SelectItem>
                        <SelectItem value='history'>History</SelectItem>
                        <SelectItem value='physical-education'>
                          Physical Education
                        </SelectItem>
                        <SelectItem value='art'>Art</SelectItem>
                        <SelectItem value='music'>Music</SelectItem>
                        <SelectItem value='computer-science'>
                          Computer Science
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='position'>Position</Label>
                    <Select defaultValue='teacher'>
                      <SelectTrigger id='position'>
                        <SelectValue placeholder='Select position' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='teacher'>Teacher</SelectItem>
                        <SelectItem value='head-teacher'>
                          Head Teacher
                        </SelectItem>
                        <SelectItem value='department-head'>
                          Department Head
                        </SelectItem>
                        <SelectItem value='coordinator'>Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='join-date'>Join Date</Label>
                    <Input type='date' id='join-date' required />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='employment-type'>Employment Type</Label>
                    <Select defaultValue='full-time'>
                      <SelectTrigger id='employment-type'>
                        <SelectValue placeholder='Select employment type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='full-time'>Full-time</SelectItem>
                        <SelectItem value='part-time'>Part-time</SelectItem>
                        <SelectItem value='contract'>Contract</SelectItem>
                        <SelectItem value='substitute'>Substitute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='qualification'>Qualification</Label>
                  <Input
                    id='qualification'
                    placeholder='Enter highest qualification (e.g., Ph.D in Mathematics)'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='experience'>Experience</Label>
                  <Input
                    id='experience'
                    placeholder='Enter years of teaching experience'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='specialization'>Specialization</Label>
                  <Input
                    id='specialization'
                    placeholder='Enter area of specialization'
                    required
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
                <Button type='button' onClick={() => setActiveTab('classes')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value='classes' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Classes & Schedule</CardTitle>
                <CardDescription>
                  Assign classes and schedule for the teacher
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Assign Classes</Label>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='algebra-10a'
                        className='h-4 w-4 rounded border-gray-300'
                      />
                      <Label htmlFor='algebra-10a'>Algebra I (10A)</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='algebra-10b'
                        className='h-4 w-4 rounded border-gray-300'
                      />
                      <Label htmlFor='algebra-10b'>Algebra I (10B)</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='calculus-12a'
                        className='h-4 w-4 rounded border-gray-300'
                      />
                      <Label htmlFor='calculus-12a'>Calculus (12A)</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='geometry-11b'
                        className='h-4 w-4 rounded border-gray-300'
                      />
                      <Label htmlFor='geometry-11b'>Geometry (11B)</Label>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='max-classes'>Maximum Classes</Label>
                  <Select defaultValue='4'>
                    <SelectTrigger id='max-classes'>
                      <SelectValue placeholder='Select maximum classes' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='3'>3 Classes</SelectItem>
                      <SelectItem value='4'>4 Classes</SelectItem>
                      <SelectItem value='5'>5 Classes</SelectItem>
                      <SelectItem value='6'>6 Classes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Preferred Schedule</Label>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='preferred-days'>Preferred Days</Label>
                      <Select defaultValue='all'>
                        <SelectTrigger id='preferred-days'>
                          <SelectValue placeholder='Select preferred days' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>All Weekdays</SelectItem>
                          <SelectItem value='mwf'>
                            Monday, Wednesday, Friday
                          </SelectItem>
                          <SelectItem value='tth'>Tuesday, Thursday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='preferred-time'>Preferred Time</Label>
                      <Select defaultValue='morning'>
                        <SelectTrigger id='preferred-time'>
                          <SelectValue placeholder='Select preferred time' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='morning'>Morning</SelectItem>
                          <SelectItem value='afternoon'>Afternoon</SelectItem>
                          <SelectItem value='all-day'>All Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='additional-responsibilities'>
                    Additional Responsibilities (Optional)
                  </Label>
                  <Textarea
                    id='additional-responsibilities'
                    placeholder='Enter any additional responsibilities'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='notes'>Additional Notes (Optional)</Label>
                  <Textarea
                    id='notes'
                    placeholder='Enter any additional notes'
                  />
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('professional')}
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
                    'Create Teacher'
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
