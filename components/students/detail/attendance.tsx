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

export const Attendance = () => {
  const attendanceData = [
    { date: '2025-03-01', status: 'Present' },
    { date: '2025-03-02', status: 'Present' },
    { date: '2025-03-03', status: 'Present' },
    { date: '2025-03-04', status: 'Absent', reason: 'Sick' },
    { date: '2025-03-05', status: 'Present' },
    { date: '2025-03-06', status: 'Present' },
    { date: '2025-03-07', status: 'Present' },
    { date: '2025-03-08', status: 'Present' },
    { date: '2025-03-09', status: 'Late', reason: 'Traffic' },
    { date: '2025-03-10', status: 'Present' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Record</CardTitle>
        <CardDescription>
          Recent attendance history for this student
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason (if applicable)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === 'Present'
                        ? 'outline'
                        : record.status === 'Absent'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>{record.reason || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
