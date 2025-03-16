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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, Plus, Trash2, Upload } from 'lucide-react';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Sample courses data
  const courses = [
    { id: 1, name: 'Algebra I', grade: '10A' },
    { id: 2, name: 'English Literature', grade: '11B' },
    { id: 3, name: 'Biology', grade: '9C' },
    { id: 4, name: 'World History', grade: '12A' },
  ];

  // Sample students data
  const students = [
    { id: 1, name: 'Emma Johnson', class: '10A' },
    { id: 2, name: 'Liam Smith', class: '10A' },
    { id: 3, name: 'Olivia Brown', class: '10A' },
    { id: 4, name: 'Noah Davis', class: '10A' },
    { id: 5, name: 'Sophia Wilson', class: '10A' },
  ];

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    dueTime: '',
    maxPoints: '100',
    description: '',
    submissionType: 'file',
    category: 'homework',
    visibleToStudents: true,
    assignTo: 'class',
    selectedStudents: [] as number[],
    allowLateSubmissions: false,
    latePenalty: '10',
    gradeVisibility: 'after_grading',
  });

  // Resources state
  const [resources, setResources] = useState<
    Array<{
      id: number;
      name: string;
      file?: File;
    }>
  >([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleStudentSelection = (studentId: number, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          selectedStudents: [...prev.selectedStudents, studentId],
        };
      } else {
        return {
          ...prev,
          selectedStudents: prev.selectedStudents.filter(
            (id) => id !== studentId,
          ),
        };
      }
    });
  };

  const handleAddResource = () => {
    setResources((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
      },
    ]);
  };

  const handleRemoveResource = (id: number) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id));
  };

  const handleFileChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setResources((prev) =>
        prev.map((resource) => {
          if (resource.id === id) {
            return { ...resource, file, name: file.name };
          }
          return resource;
        }),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to create assignment
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard/assignments');
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/assignments'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>
            Create New Assignment
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-4'
        >
          <TabsList>
            <TabsTrigger value='details'>Assignment Details</TabsTrigger>
            <TabsTrigger value='resources'>Resources</TabsTrigger>
            <TabsTrigger value='students'>Assign to Students</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>

          {/* Assignment Details Tab */}
          <TabsContent value='details' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details for your assignment
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Assignment Title</Label>
                  <Input
                    id='title'
                    name='title'
                    placeholder='Enter assignment title'
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='course'>Course</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      handleSelectChange('course', value)
                    }
                  >
                    <SelectTrigger id='course'>
                      <SelectValue placeholder='Select course' />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id.toString()}
                        >
                          {course.name} ({course.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                  <div className='space-y-2'>
                    <Label htmlFor='dueDate'>Due Date</Label>
                    <Input
                      id='dueDate'
                      name='dueDate'
                      type='date'
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='dueTime'>Due Time</Label>
                    <Input
                      id='dueTime'
                      name='dueTime'
                      type='time'
                      value={formData.dueTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='maxPoints'>Maximum Points</Label>
                    <Input
                      id='maxPoints'
                      name='maxPoints'
                      type='number'
                      min='0'
                      value={formData.maxPoints}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='category'>Assignment Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange('category', value)
                    }
                  >
                    <SelectTrigger id='category'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='homework'>Homework</SelectItem>
                      <SelectItem value='quiz'>Quiz</SelectItem>
                      <SelectItem value='project'>Project</SelectItem>
                      <SelectItem value='exam'>Exam</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Assignment Description</Label>
                  <Textarea
                    id='description'
                    name='description'
                    placeholder='Enter detailed instructions for the assignment'
                    className='min-h-32'
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='submissionType'>Submission Type</Label>
                  <RadioGroup
                    value={formData.submissionType}
                    onValueChange={(value) =>
                      handleSelectChange('submissionType', value)
                    }
                    className='flex flex-col space-y-1'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='file' id='submission-file' />
                      <Label htmlFor='submission-file'>File Upload</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='text' id='submission-text' />
                      <Label htmlFor='submission-text'>Text Entry</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='link' id='submission-link' />
                      <Label htmlFor='submission-link'>Website URL</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='quiz' id='submission-quiz' />
                      <Label htmlFor='submission-quiz'>Online Quiz</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='flex items-center space-x-2'>
                  <Switch
                    id='visibleToStudents'
                    checked={formData.visibleToStudents}
                    onCheckedChange={(checked) =>
                      handleSwitchChange('visibleToStudents', checked)
                    }
                  />
                  <Label htmlFor='visibleToStudents'>
                    Make visible to students immediately
                  </Label>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline' type='button' disabled>
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('resources')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value='resources' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Resources</CardTitle>
                <CardDescription>
                  Add files and resources for students
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex flex-wrap gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleAddResource}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add Resource
                  </Button>
                </div>

                <div className='space-y-4'>
                  {resources.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-md'>
                      <Upload className='h-12 w-12 text-muted-foreground mb-4' />
                      <p className='text-muted-foreground'>
                        No resources added yet
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Click the button above to add resources
                      </p>
                    </div>
                  ) : (
                    resources.map((resource) => (
                      <div
                        key={resource.id}
                        className='flex items-center gap-4 p-4 border rounded-md'
                      >
                        <div className='flex-1'>
                          <div className='space-y-2'>
                            <Label htmlFor={`file-${resource.id}`}>
                              Resource File
                            </Label>
                            <div className='flex items-center gap-2'>
                              <Input
                                id={`file-${resource.id}`}
                                type='file'
                                onChange={(e) =>
                                  handleFileChange(resource.id, e)
                                }
                                className='flex-1'
                              />
                              {resource.name && (
                                <span className='text-sm text-muted-foreground truncate max-w-[200px]'>
                                  {resource.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => handleRemoveResource(resource.id)}
                        >
                          <Trash2 className='h-4 w-4 text-destructive' />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('details')}
                >
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('students')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Assign to Students Tab */}
          <TabsContent value='students' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Assign to Students</CardTitle>
                <CardDescription>
                  Select which students will receive this assignment
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-4'>
                  <RadioGroup
                    value={formData.assignTo}
                    onValueChange={(value) =>
                      handleSelectChange('assignTo', value)
                    }
                    className='flex flex-col space-y-3'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='class' id='assign-class' />
                      <Label htmlFor='assign-class'>
                        Assign to entire class
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='students' id='assign-students' />
                      <Label htmlFor='assign-students'>
                        Assign to specific students
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.assignTo === 'students' && (
                    <div className='mt-4 border rounded-md p-4'>
                      <div className='mb-2 flex justify-between items-center'>
                        <h3 className='font-medium'>Select Students</h3>
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            const allStudentIds = students.map((s) => s.id);
                            if (
                              formData.selectedStudents.length ===
                              allStudentIds.length
                            ) {
                              // Deselect all
                              setFormData((prev) => ({
                                ...prev,
                                selectedStudents: [],
                              }));
                            } else {
                              // Select all
                              setFormData((prev) => ({
                                ...prev,
                                selectedStudents: allStudentIds,
                              }));
                            }
                          }}
                        >
                          {formData.selectedStudents.length === students.length
                            ? 'Deselect All'
                            : 'Select All'}
                        </Button>
                      </div>
                      <div className='space-y-2 max-h-60 overflow-y-auto pr-2'>
                        {students.map((student) => (
                          <div
                            key={student.id}
                            className='flex items-center space-x-2 p-2 border rounded-md'
                          >
                            <Checkbox
                              id={`student-${student.id}`}
                              checked={formData.selectedStudents.includes(
                                student.id,
                              )}
                              onCheckedChange={(checked) =>
                                handleStudentSelection(
                                  student.id,
                                  checked as boolean,
                                )
                              }
                            />
                            <Label
                              htmlFor={`student-${student.id}`}
                              className='flex-1'
                            >
                              {student.name}
                            </Label>
                            <span className='text-sm text-muted-foreground'>
                              Class {student.class}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className='mt-2 text-sm text-muted-foreground'>
                        {formData.selectedStudents.length} of {students.length}{' '}
                        students selected
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('resources')}
                >
                  Previous
                </Button>
                <Button type='button' onClick={() => setActiveTab('settings')}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value='settings' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Settings</CardTitle>
                <CardDescription>
                  Configure additional settings for this assignment
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='allowLateSubmissions'
                      checked={formData.allowLateSubmissions}
                      onCheckedChange={(checked) =>
                        handleSwitchChange('allowLateSubmissions', checked)
                      }
                    />
                    <Label htmlFor='allowLateSubmissions'>
                      Allow late submissions
                    </Label>
                  </div>

                  {formData.allowLateSubmissions && (
                    <div className='ml-6 space-y-2'>
                      <Label htmlFor='latePenalty'>
                        Late Submission Penalty (%)
                      </Label>
                      <div className='flex items-center gap-2'>
                        <Input
                          id='latePenalty'
                          name='latePenalty'
                          type='number'
                          min='0'
                          max='100'
                          value={formData.latePenalty}
                          onChange={handleInputChange}
                          className='w-24'
                        />
                        <span className='text-sm text-muted-foreground'>
                          % deduction per day
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='gradeVisibility'>Grade Visibility</Label>
                  <Select
                    value={formData.gradeVisibility}
                    onValueChange={(value) =>
                      handleSelectChange('gradeVisibility', value)
                    }
                  >
                    <SelectTrigger id='gradeVisibility'>
                      <SelectValue placeholder='Select when grades are visible' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='after_grading'>
                        After grading
                      </SelectItem>
                      <SelectItem value='after_due_date'>
                        After due date
                      </SelectItem>
                      <SelectItem value='immediately'>Immediately</SelectItem>
                      <SelectItem value='manual'>Manual release</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  type='button'
                  onClick={() => setActiveTab('students')}
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
                    'Create Assignment'
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
