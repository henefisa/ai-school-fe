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
  BookOpenIcon,
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  BellIcon,
  ClockIcon,
} from 'lucide-react';

export default function StudentDashboard() {
  // Sample courses data
  const courses = [
    {
      id: 1,
      name: 'Algebra I',
      teacher: 'Dr. Robert Chen',
      grade: 'A',
      progress: 85,
    },
    {
      id: 2,
      name: 'English Literature',
      teacher: 'Sarah Johnson',
      grade: 'A-',
      progress: 90,
    },
    {
      id: 3,
      name: 'Biology',
      teacher: 'Michael Williams',
      grade: 'B+',
      progress: 78,
    },
    {
      id: 4,
      name: 'World History',
      teacher: 'Emily Davis',
      grade: 'A',
      progress: 92,
    },
  ];

  // Sample assignments data
  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations',
      course: 'Algebra I',
      dueDate: 'Mar 20, 2025',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Essay on Shakespeare',
      course: 'English Literature',
      dueDate: 'Mar 22, 2025',
      status: 'Submitted',
    },
    {
      id: 3,
      title: 'Lab Report: Photosynthesis',
      course: 'Biology',
      dueDate: 'Mar 18, 2025',
      status: 'Graded',
      grade: 'A-',
    },
    {
      id: 4,
      title: 'World War II Research',
      course: 'World History',
      dueDate: 'Mar 25, 2025',
      status: 'Pending',
    },
  ];

  // Sample schedule data
  const todaySchedule = [
    { time: '8:00 AM - 9:20 AM', course: 'Algebra I', room: '101' },
    { time: '9:30 AM - 10:50 AM', course: 'English Literature', room: '203' },
    { time: '11:00 AM - 12:20 PM', course: 'Biology', room: 'Lab 3' },
    { time: '1:00 PM - 2:20 PM', course: 'World History', room: '205' },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Student Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here&apos;s an overview of your courses and assignments.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>GPA</CardTitle>
            <GraduationCapIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3.8</div>
            <p className='text-xs text-muted-foreground'>Out of 4.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Courses</CardTitle>
            <BookOpenIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4</div>
            <p className='text-xs text-muted-foreground'>Current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Assignments</CardTitle>
            <FileTextIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2</div>
            <p className='text-xs text-muted-foreground'>Due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Attendance</CardTitle>
            <CalendarIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>98%</div>
            <p className='text-xs text-muted-foreground'>This semester</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='schedule'>
        <TabsList>
          <TabsTrigger value='schedule'>Today's Schedule</TabsTrigger>
          <TabsTrigger value='courses'>My Courses</TabsTrigger>
          <TabsTrigger value='assignments'>Assignments</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value='schedule' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {todaySchedule.map((period, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        <ClockIcon className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <p className='font-medium'>{period.course}</p>
                        <p className='text-sm text-muted-foreground'>
                          Room {period.room}
                        </p>
                      </div>
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {period.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='courses' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>
                Your current courses and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {courses.map((course) => (
                  <div key={course.id} className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium'>{course.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {course.teacher}
                        </p>
                      </div>
                      <Badge>{course.grade}</Badge>
                    </div>
                    <div className='space-y-1'>
                      <div className='flex items-center justify-between text-sm'>
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className='h-2' />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='assignments' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                Your current and upcoming assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                        <FileTextIcon className='h-5 w-5 text-primary' />
                      </div>
                      <div>
                        <p className='font-medium'>{assignment.title}</p>
                        <p className='text-sm text-muted-foreground'>
                          {assignment.course} • Due {assignment.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {assignment.status === 'Graded' && (
                        <Badge variant='outline' className='mr-2'>
                          {assignment.grade}
                        </Badge>
                      )}
                      <Badge
                        variant={
                          assignment.status === 'Pending'
                            ? 'default'
                            : assignment.status === 'Submitted'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='notifications' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Stay updated with the latest announcements and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0'
                  >
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/20'>
                      <BellIcon className='h-4 w-4 text-primary' />
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>
                        {
                          [
                            'Assignment deadline extended for Biology',
                            'Math quiz scheduled for next Monday',
                            'English Literature essay feedback posted',
                            'School event: Science Fair registration open',
                          ][i - 1]
                        }
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {
                          [
                            '1 hour ago',
                            '3 hours ago',
                            'Yesterday',
                            '2 days ago',
                          ][i - 1]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
