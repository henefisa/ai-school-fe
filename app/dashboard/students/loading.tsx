import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <Skeleton className='h-8 w-[150px]' />
          <Skeleton className='mt-2 h-4 w-[250px]' />
        </div>
        <Skeleton className='h-10 w-[120px]' />
      </div>

      <div className='space-y-4'>
        <Skeleton className='h-10 w-[300px]' />

        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <Skeleton className='h-6 w-[120px]' />
            <Skeleton className='h-9 w-[100px]' />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className='h-4 w-[80px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-[60px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-[70px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-[60px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-[90px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-4 w-[80px]' />
                  </TableHead>
                  <TableHead className='text-right'>
                    <Skeleton className='h-4 w-[70px] ml-auto' />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton className='h-6 w-[150px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[60px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[80px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[70px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[60px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[50px]' />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Skeleton className='h-8 w-[60px] ml-auto' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
