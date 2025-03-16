import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='mt-2 h-4 w-64' />
        </div>
        <Skeleton className='h-10 w-40' />
      </div>

      <div className='grid gap-6 md:grid-cols-4'>
        <Skeleton className='h-28 w-full' />
        <Skeleton className='h-28 w-full' />
        <Skeleton className='h-28 w-full' />
        <Skeleton className='h-28 w-full' />
      </div>

      <div className='space-y-4'>
        <div className='flex justify-between'>
          <Skeleton className='h-10 w-64' />
          <Skeleton className='h-10 w-64' />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className='h-5 w-32' />
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
