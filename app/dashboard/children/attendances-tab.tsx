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

const attendanceData = [
  { date: '2025-03-15', status: 'Present' },
  { date: '2025-03-14', status: 'Present' },
  { date: '2025-03-13', status: 'Present' },
  { date: '2025-03-12', status: 'Absent', reason: 'Sick' },
  { date: '2025-03-11', status: 'Present' },
  { date: '2025-03-10', status: 'Present' },
  { date: '2025-03-09', status: 'Present' },
  { date: '2025-03-08', status: 'Present' },
  { date: '2025-03-07', status: 'Late', reason: 'Traffic' },
  { date: '2025-03-06', status: 'Present' },
];

const selectedChildData = {
  attendance: { present: 98, absent: 2, late: 0 },
};

export const AttendancesTab = () => {
  return (
    <TabsContent value='attendance' className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription>Recent attendance history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6 md:grid-cols-3 mb-6'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium'>Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-green-600'>
                  {selectedChildData.attendance.present}%
                </div>
                <p className='text-xs text-muted-foreground'>
                  {selectedChildData.attendance.present} days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium'>Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-red-600'>
                  {selectedChildData.attendance.absent}%
                </div>
                <p className='text-xs text-muted-foreground'>
                  {selectedChildData.attendance.absent} days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium'>Late</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-amber-600'>
                  {selectedChildData.attendance.late}%
                </div>
                <p className='text-xs text-muted-foreground'>
                  {selectedChildData.attendance.late} days
                </p>
              </CardContent>
            </Card>
          </div>

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
    </TabsContent>
  );
};
