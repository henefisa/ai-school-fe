import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Grades = () => {
  const gradesData = [
    {
      assignment: 'Algebra Quiz 1',
      course: 'MATH101',
      date: '2025-02-10',
      grade: '90/100',
      type: 'Quiz',
    },
    {
      assignment: 'English Essay',
      course: 'ENG203',
      date: '2025-02-15',
      grade: '88/100',
      type: 'Assignment',
    },
    {
      assignment: 'Biology Lab Report',
      course: 'SCI105',
      date: '2025-02-20',
      grade: '85/100',
      type: 'Lab',
    },
    {
      assignment: 'History Presentation',
      course: 'HIST202',
      date: '2025-02-25',
      grade: '95/100',
      type: 'Presentation',
    },
    {
      assignment: 'Programming Project',
      course: 'CS101',
      date: '2025-03-01',
      grade: '98/100',
      type: 'Project',
    },
    {
      assignment: 'Algebra Midterm',
      course: 'MATH101',
      date: '2025-03-05',
      grade: '92/100',
      type: 'Exam',
    },
    {
      assignment: 'English Book Report',
      course: 'ENG203',
      date: '2025-03-10',
      grade: '90/100',
      type: 'Assignment',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
        <CardDescription>
          View all grades and assignments for this student
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradesData.map((grade, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>
                  {grade.assignment}
                </TableCell>
                <TableCell>{grade.course}</TableCell>
                <TableCell>
                  {new Date(grade.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell>
                  <Badge variant='outline'>{grade.type}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
