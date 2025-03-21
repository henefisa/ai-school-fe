import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Clock, FileText } from 'lucide-react';

const assignments = [
  {
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    dueDate: '2025-03-20',
    status: 'Pending',
    description: 'Complete problems 1-20 on page 45 of the textbook.',
    teacher: 'Dr. Robert Chen',
  },
  {
    title: 'Essay on Shakespeare',
    subject: 'English Literature',
    dueDate: '2025-03-22',
    status: 'Submitted',
    description: 'Write a 1000-word essay analyzing the themes in Hamlet.',
    teacher: 'Sarah Johnson',
  },
  {
    title: 'Lab Report: Photosynthesis',
    subject: 'Biology',
    dueDate: '2025-03-18',
    status: 'Graded',
    grade: 'A-',
    description:
      'Write a lab report on the photosynthesis experiment conducted in class.',
    teacher: 'Michael Williams',
  },
  {
    title: 'World War II Research',
    subject: 'World History',
    dueDate: '2025-03-25',
    status: 'Pending',
    description: 'Research and present on a specific aspect of World War II.',
    teacher: 'Emily Davis',
  },
];

export const AssignmentsTab = () => {
  return (
    <TabsContent value='assignments' className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>Current and upcoming assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {assignment.title}
                  </TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
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
                      {assignment.grade && ` (${assignment.grade})`}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        document
                          .getElementById(`assignment-details-${index}`)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className='mt-8 space-y-6'>
            <h3 className='text-lg font-semibold'>Assignment Details</h3>
            {assignments.map((assignment, index) => (
              <div
                key={index}
                id={`assignment-details-${index}`}
                className='border rounded-lg p-4'
              >
                <div className='flex items-center justify-between mb-2'>
                  <h4 className='text-md font-medium'>{assignment.title}</h4>
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
                    {assignment.grade && ` (${assignment.grade})`}
                  </Badge>
                </div>
                <div className='grid gap-2 md:grid-cols-3 mb-4 text-sm'>
                  <div>
                    <span className='font-medium'>Subject:</span>{' '}
                    {assignment.subject}
                  </div>
                  <div>
                    <span className='font-medium'>Due Date:</span>{' '}
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className='font-medium'>Teacher:</span>{' '}
                    {assignment.teacher}
                  </div>
                </div>
                <div className='mb-4'>
                  <h5 className='text-sm font-medium mb-1'>Description:</h5>
                  <p className='text-sm text-muted-foreground'>
                    {assignment.description}
                  </p>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button variant='outline' size='sm'>
                    <FileText className='mr-2 h-4 w-4' />
                    View Assignment
                  </Button>
                  {assignment.status === 'Pending' && (
                    <Button size='sm'>
                      <Clock className='mr-2 h-4 w-4' />
                      Set Reminder
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
