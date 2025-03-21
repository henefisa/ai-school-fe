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

const grades = [
  {
    subject: 'Mathematics',
    currentGrade: 'A',
    teacher: 'Dr. Robert Chen',
    lastUpdated: 'Mar 15, 2025',
  },
  {
    subject: 'English Literature',
    currentGrade: 'A-',
    teacher: 'Sarah Johnson',
    lastUpdated: 'Mar 12, 2025',
  },
  {
    subject: 'Biology',
    currentGrade: 'B+',
    teacher: 'Michael Williams',
    lastUpdated: 'Mar 10, 2025',
  },
  {
    subject: 'World History',
    currentGrade: 'A',
    teacher: 'Emily Davis',
    lastUpdated: 'Mar 8, 2025',
  },
  {
    subject: 'Computer Science',
    currentGrade: 'A+',
    teacher: 'David Martinez',
    lastUpdated: 'Mar 5, 2025',
  },
];

const detailedGrades = [
  {
    subject: 'Mathematics',
    assignments: [
      {
        name: 'Algebra Quiz 1',
        score: 92,
        maxScore: 100,
        weight: '10%',
        date: 'Feb 10, 2025',
      },
      {
        name: 'Algebra Assignment 1',
        score: 88,
        maxScore: 100,
        weight: '15%',
        date: 'Feb 15, 2025',
      },
      {
        name: 'Algebra Midterm',
        score: 90,
        maxScore: 100,
        weight: '30%',
        date: 'Mar 1, 2025',
      },
    ],
    average: 90,
    grade: 'A',
  },
  {
    subject: 'English Literature',
    assignments: [
      {
        name: 'Essay on Shakespeare',
        score: 85,
        maxScore: 100,
        weight: '20%',
        date: 'Feb 12, 2025',
      },
      {
        name: 'Reading Comprehension',
        score: 88,
        maxScore: 100,
        weight: '15%',
        date: 'Feb 20, 2025',
      },
      {
        name: 'Literature Analysis',
        score: 92,
        maxScore: 100,
        weight: '25%',
        date: 'Mar 5, 2025',
      },
    ],
    average: 88.5,
    grade: 'A-',
  },
  {
    subject: 'Biology',
    assignments: [
      {
        name: 'Cell Structure Quiz',
        score: 85,
        maxScore: 100,
        weight: '10%',
        date: 'Feb 8, 2025',
      },
      {
        name: 'Lab Report: Photosynthesis',
        score: 88,
        maxScore: 100,
        weight: '20%',
        date: 'Feb 18, 2025',
      },
      {
        name: 'Biology Midterm',
        score: 82,
        maxScore: 100,
        weight: '30%',
        date: 'Mar 3, 2025',
      },
    ],
    average: 84.3,
    grade: 'B+',
  },
];

export const GradesTab = () => {
  return (
    <TabsContent value='grades' className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Current Grades</CardTitle>
          <CardDescription>
            Academic performance across all subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{grade.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        grade.currentGrade.startsWith('A')
                          ? 'default'
                          : grade.currentGrade.startsWith('B')
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {grade.currentGrade}
                    </Badge>
                  </TableCell>
                  <TableCell>{grade.teacher}</TableCell>
                  <TableCell>{grade.lastUpdated}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        document
                          .getElementById(`grade-details-${index}`)
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
            <h3 className='text-lg font-semibold'>Detailed Grade Breakdown</h3>
            {detailedGrades.map((subject, index) => (
              <div
                key={index}
                id={`grade-details-${index}`}
                className='border rounded-lg p-4'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h4 className='text-md font-medium'>{subject.subject}</h4>
                    <p className='text-sm text-muted-foreground'>
                      Current Grade: {subject.grade} ({subject.average}%)
                    </p>
                  </div>
                  <Badge
                    variant={
                      subject.grade.startsWith('A')
                        ? 'default'
                        : subject.grade.startsWith('B')
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {subject.grade}
                  </Badge>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subject.assignments.map((assignment, idx) => (
                      <TableRow key={idx}>
                        <TableCell className='font-medium'>
                          {assignment.name}
                        </TableCell>
                        <TableCell>
                          {assignment.score}/{assignment.maxScore} (
                          {Math.round(
                            (assignment.score / assignment.maxScore) * 100
                          )}
                          %)
                        </TableCell>
                        <TableCell>{assignment.weight}</TableCell>
                        <TableCell>{assignment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
