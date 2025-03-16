'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  Video,
} from 'lucide-react';

export default function StudentLessonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLessonViewed, setIsLessonViewed] = useState(false);

  // Sample lesson data
  const lesson = {
    id: params.id,
    title: 'Introduction to Quadratic Equations',
    course: { id: 1, name: 'Algebra I', grade: '10A' },
    teacher: 'Dr. Robert Chen',
    date: '2025-03-20',
    time: '09:00 - 10:30',
    status: 'upcoming',
    description: `
      This lesson introduces students to quadratic equations and their properties. We will cover:
      
      • The standard form of a quadratic equation: ax² + bx + c = 0
      • Identifying the coefficients a, b, and c
      • Understanding the graph of a quadratic function (parabola)
      • Finding the roots (solutions) of quadratic equations
      
      Students will learn how to solve quadratic equations using factoring, completing the square, and the quadratic formula.
    `,
    objectives: `
      By the end of this lesson, students will be able to:
      
      • Identify a quadratic equation in standard form
      • Understand the relationship between the coefficients and the graph
      • Solve simple quadratic equations by factoring
      • Apply the quadratic formula to find solutions
      • Interpret the solutions in the context of the problem
    `,
    meetingLink: 'https://zoom.us/j/123456789',
    resources: [
      {
        id: 1,
        type: 'document',
        name: 'Quadratic Equations.pdf',
        size: '2.4 MB',
      },
      {
        id: 2,
        type: 'video',
        name: 'Solving Quadratics Tutorial',
        size: '45 MB',
      },
      {
        id: 3,
        type: 'link',
        name: 'Interactive Quadratics Explorer',
        url: 'https://www.geogebra.org/m/qbmhuzgw',
      },
    ],
    hasAssignment: true,
    assignment: {
      id: 1,
      title: 'Quadratic Equations Practice',
      dueDate: '2025-03-25',
      status: 'not-started',
    },
    hasQuiz: false,
    hasDiscussion: true,
    discussion: {
      id: 1,
      title: 'Quadratic Equations Discussion',
      posts: 5,
    },
    progress: 0,
  };

  const markAsViewed = () => {
    setIsLessonViewed(true);
    // In a real app, this would make an API call to update the lesson status
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/my-lessons'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>{lesson.title}</h1>
        </div>
        <div className='flex gap-2'>
          {!isLessonViewed ? (
            <Button onClick={markAsViewed}>
              <Check className='mr-2 h-4 w-4' />
              Mark as Viewed
            </Button>
          ) : (
            <Button variant='outline' disabled>
              <Check className='mr-2 h-4 w-4' />
              Viewed
            </Button>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Course</CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{lesson.course.name}</div>
            <p className='text-xs text-muted-foreground'>
              Grade {lesson.course.grade} • {lesson.teacher}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Date & Time</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {new Date(lesson.date).toLocaleDateString()}
            </div>
            <p className='text-xs text-muted-foreground'>{lesson.time}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Progress</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {isLessonViewed ? '100%' : '0%'}
            </div>
            <Progress value={isLessonViewed ? 100 : 0} className='h-2 mt-2' />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='resources'>Resources</TabsTrigger>
          <TabsTrigger value='assignments'>Assignments</TabsTrigger>
          <TabsTrigger value='discussion'>Discussion</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value='overview' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Lesson Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none'>
                {lesson.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none'>
                {lesson.objectives.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {lesson.meetingLink && (
            <Card>
              <CardHeader>
                <CardTitle>Online Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center gap-4'>
                  <div className='flex-1'>
                    <p className='font-medium'>{lesson.meetingLink}</p>
                    <p className='text-sm text-muted-foreground'>
                      Click the button to join the meeting
                    </p>
                  </div>
                  <a
                    href={lesson.meetingLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Button>
                      <ExternalLink className='mr-2 h-4 w-4' />
                      Join Meeting
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value='resources' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Lesson Resources</CardTitle>
              <CardDescription>
                Access resources for this lesson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {lesson.resources.length === 0 ? (
                  <div className='flex flex-col items-center justify-center py-8'>
                    <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                    <p className='text-muted-foreground'>
                      No resources available
                    </p>
                  </div>
                ) : (
                  lesson.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className='flex items-center gap-4 p-4 border rounded-md'
                    >
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        {resource.type === 'document' && (
                          <FileText className='h-5 w-5 text-primary' />
                        )}
                        {resource.type === 'video' && (
                          <Video className='h-5 w-5 text-primary' />
                        )}
                        {resource.type === 'link' && (
                          <ExternalLink className='h-5 w-5 text-primary' />
                        )}
                      </div>
                      <div className='flex-1'>
                        <p className='font-medium'>{resource.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {resource.type === 'link'
                            ? resource.url
                            : `${resource.size}`}
                        </p>
                      </div>
                      <div>
                        {resource.type === 'link' ? (
                          <a
                            href={resource.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Button variant='outline' size='sm'>
                              <ExternalLink className='mr-2 h-4 w-4' />
                              Open
                            </Button>
                          </a>
                        ) : (
                          <Button variant='outline' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value='assignments' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Assignments & Quizzes</CardTitle>
              <CardDescription>
                View and complete assignments for this lesson
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {!lesson.hasAssignment && !lesson.hasQuiz ? (
                  <div className='flex flex-col items-center justify-center py-8'>
                    <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                    <p className='text-muted-foreground'>
                      No assignments or quizzes available
                    </p>
                  </div>
                ) : (
                  <>
                    {lesson.hasAssignment && (
                      <div className='p-4 border rounded-md'>
                        <div className='flex items-center gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                            <FileText className='h-5 w-5 text-primary' />
                          </div>
                          <div className='flex-1'>
                            <p className='font-medium'>
                              {lesson.assignment.title}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Due:{' '}
                              {new Date(
                                lesson.assignment.dueDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                lesson.assignment.status === 'not-started'
                                  ? 'outline'
                                  : lesson.assignment.status === 'in-progress'
                                    ? 'secondary'
                                    : 'default'
                              }
                            >
                              {lesson.assignment.status === 'not-started'
                                ? 'Not Started'
                                : lesson.assignment.status === 'in-progress'
                                  ? 'In Progress'
                                  : 'Completed'}
                            </Badge>
                          </div>
                          <div>
                            <Link
                              href={`/dashboard/assignments/${lesson.assignment.id}`}
                            >
                              <Button variant='outline' size='sm'>
                                {lesson.assignment.status === 'not-started'
                                  ? 'Start'
                                  : 'Continue'}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {lesson.hasQuiz && (
                      <div className='p-4 border rounded-md'>
                        <div className='flex items-center gap-4'>
                          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                            <FileText className='h-5 w-5 text-primary' />
                          </div>
                          <div className='flex-1'>
                            <p className='font-medium'>Lesson Quiz</p>
                            <p className='text-sm text-muted-foreground'>
                              10 questions • 15 minutes
                            </p>
                          </div>
                          <div>
                            <Badge variant='outline'>Not Started</Badge>
                          </div>
                          <div>
                            <Button variant='outline' size='sm'>
                              Start Quiz
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discussion Tab */}
        <TabsContent value='discussion' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forum</CardTitle>
              <CardDescription>
                Participate in the class discussion
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!lesson.hasDiscussion ? (
                <div className='flex flex-col items-center justify-center py-8'>
                  <MessageSquare className='h-12 w-12 text-muted-foreground mb-4' />
                  <p className='text-muted-foreground'>
                    No discussion forum available
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='p-4 border rounded-md'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        <MessageSquare className='h-5 w-5 text-primary' />
                      </div>
                      <div className='flex-1'>
                        <p className='font-medium'>{lesson.discussion.title}</p>
                        <p className='text-sm text-muted-foreground'>
                          {lesson.discussion.posts} posts in this discussion
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/discussions/${lesson.discussion.id}`}
                        >
                          <Button variant='outline' size='sm'>
                            View Discussion
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
