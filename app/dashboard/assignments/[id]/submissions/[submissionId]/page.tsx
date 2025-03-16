'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  Save,
  Send,
} from 'lucide-react';

export default function GradeSubmissionPage({
  params,
}: {
  params: { id: string; submissionId: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState<string>('95');
  const [feedback, setFeedback] = useState<string>(
    'Excellent work! All problems solved correctly.',
  );

  // Sample assignment data
  const assignment = {
    id: params.id,
    title: 'Quadratic Equations Practice',
    course: { id: 1, name: 'Algebra I', grade: '10A' },
    dueDate: '2025-03-25',
    maxPoints: 100,
  };

  // Sample submission data
  const submission = {
    id: params.submissionId,
    student: { id: 1, name: 'Emma Johnson', avatar: '/placeholder.svg' },
    submittedAt: '2025-03-24T14:30:00',
    status: 'graded',
    grade: 95,
    late: false,
    feedback: 'Excellent work! All problems solved correctly.',
    files: [
      { id: 1, name: 'Quadratic_Equations_Solutions.pdf', size: '1.8 MB' },
    ],
  };

  const handleSaveGrade = async () => {
    setIsLoading(true);

    // Simulate API call to save grade
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/dashboard/assignments/${params.id}/submissions`);
    }, 1500);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href={`/dashboard/assignments/${params.id}/submissions`}>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Grade Submission
            </h1>
            <p className='text-muted-foreground'>
              {assignment.title} • {assignment.course.name}
            </p>
          </div>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={submission.student.avatar}
                    alt={submission.student.name}
                  />
                  <AvatarFallback>
                    {submission.student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{submission.student.name}</CardTitle>
                  <CardDescription>
                    Submitted on{' '}
                    {new Date(submission.submittedAt).toLocaleString()}
                    {submission.late && (
                      <Badge
                        variant='outline'
                        className='ml-2 text-red-500 border-red-200 bg-red-50'
                      >
                        Late
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='submission'>
                <TabsList>
                  <TabsTrigger value='submission'>Submission</TabsTrigger>
                  <TabsTrigger value='files'>Files</TabsTrigger>
                </TabsList>

                <TabsContent value='submission' className='space-y-4 mt-4'>
                  <div className='space-y-4'>
                    {submission.files.map((file) => (
                      <div
                        key={file.id}
                        className='flex items-center gap-4 p-4 border rounded-md'
                      >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                          <FileText className='h-5 w-5 text-primary' />
                        </div>
                        <div className='flex-1'>
                          <p className='font-medium'>{file.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {file.size}
                          </p>
                        </div>
                        <div>
                          <Button variant='outline' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='p-4 border rounded-md'>
                    <h3 className='font-medium mb-2'>Submission Preview</h3>
                    <div className='aspect-video bg-muted rounded-md flex items-center justify-center'>
                      <p className='text-muted-foreground'>
                        Document preview would appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='files' className='space-y-4 mt-4'>
                  <div className='space-y-4'>
                    {submission.files.map((file) => (
                      <div
                        key={file.id}
                        className='flex items-center gap-4 p-4 border rounded-md'
                      >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                          <FileText className='h-5 w-5 text-primary' />
                        </div>
                        <div className='flex-1'>
                          <p className='font-medium'>{file.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {file.size}
                          </p>
                        </div>
                        <div>
                          <Button variant='outline' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Grade Submission</CardTitle>
              <CardDescription>Provide a grade and feedback</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Grade</label>
                <div className='flex items-center gap-2'>
                  <Input
                    type='number'
                    min='0'
                    max={assignment.maxPoints}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className='w-24'
                  />
                  <span className='text-sm text-muted-foreground'>
                    / {assignment.maxPoints}
                  </span>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Feedback</label>
                <Textarea
                  placeholder='Provide feedback to the student'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className='min-h-32'
                />
              </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <Button
                className='w-full'
                onClick={handleSaveGrade}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='mr-2 h-4 w-4' />
                    Save Grade
                  </>
                )}
              </Button>
              <Button variant='outline' className='w-full' disabled={isLoading}>
                <Send className='mr-2 h-4 w-4' />
                Save and Notify Student
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className='space-y-4'>
                <div className='flex flex-col'>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Assignment
                  </dt>
                  <dd className='text-sm'>{assignment.title}</dd>
                </div>
                <div className='flex flex-col'>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Course
                  </dt>
                  <dd className='text-sm'>
                    {assignment.course.name} ({assignment.course.grade})
                  </dd>
                </div>
                <div className='flex flex-col'>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Due Date
                  </dt>
                  <dd className='text-sm'>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className='flex flex-col'>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Submission Date
                  </dt>
                  <dd className='text-sm'>
                    {new Date(submission.submittedAt).toLocaleString()}
                  </dd>
                </div>
                <div className='flex flex-col'>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Status
                  </dt>
                  <dd className='text-sm capitalize'>{submission.status}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
