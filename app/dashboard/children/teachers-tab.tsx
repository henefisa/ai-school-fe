import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { MessageSquare } from 'lucide-react';

const selectedChildData = {
  id: 1,
  name: 'Emma Johnson',
  grade: '10A',
  avatar: '/placeholder.svg',
  teacher: 'Dr. Robert Chen',
  attendance: { present: 98, absent: 2, late: 0 },
  gpa: 3.8,
  recentActivity: {
    newGrades: 2,
    upcomingAssignments: 3,
  },
  teachers: [
    {
      name: 'Dr. Robert Chen',
      subject: 'Mathematics',
      email: 'robert.chen@school.edu',
    },
    {
      name: 'Sarah Johnson',
      subject: 'English Literature',
      email: 'sarah.johnson@school.edu',
    },
    {
      name: 'Michael Williams',
      subject: 'Biology',
      email: 'michael.williams@school.edu',
    },
    {
      name: 'Emily Davis',
      subject: 'World History',
      email: 'emily.davis@school.edu',
    },
    {
      name: 'David Martinez',
      subject: 'Computer Science',
      email: 'david.martinez@school.edu',
    },
  ],
};

export const TeachersTab = () => {
  return (
    <TabsContent value='teachers' className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
          <CardDescription>
            Contact information for your child's teachers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {selectedChildData.teachers.map((teacher, index) => (
              <div
                key={index}
                className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'
              >
                <div className='flex items-center gap-4'>
                  <Avatar className='h-10 w-10'>
                    <AvatarFallback>
                      {teacher.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{teacher.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {teacher.subject}
                    </p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>
                    <MessageSquare className='mr-2 h-4 w-4' />
                    Message
                  </Button>
                  <Button variant='ghost' size='sm'>
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
