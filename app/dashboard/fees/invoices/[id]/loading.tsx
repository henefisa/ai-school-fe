import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-8 w-48' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-24' />
          <Skeleton className='h-10 w-24' />
          <Skeleton className='h-10 w-24' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-5 w-32' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-1 h-5 w-32' />
              </div>
              <div>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-1 h-5 w-20' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-1 h-5 w-32' />
              </div>
              <div>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-1 h-5 w-32' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-5 w-40' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='mt-1 h-5 w-32' />
            </div>
            <div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='mt-1 h-5 w-48' />
            </div>
            <div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='mt-1 h-5 w-24' />
            </div>
            <div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='mt-1 h-5 w-40' />
            </div>
            <div>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='mt-1 h-5 w-48' />
              <Skeleton className='mt-1 h-5 w-40' />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-5 w-32' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='grid grid-cols-12'>
              <Skeleton className='col-span-8 h-5 w-24' />
              <Skeleton className='col-span-4 h-5 w-24 justify-self-end' />
            </div>
            <Skeleton className='h-px w-full' />
            <div className='grid grid-cols-12'>
              <Skeleton className='col-span-8 h-5 w-64' />
              <Skeleton className='col-span-4 h-5 w-24 justify-self-end' />
            </div>
            <Skeleton className='h-px w-full' />
            <div className='grid grid-cols-12'>
              <Skeleton className='col-span-8 h-5 w-24 justify-self-end' />
              <Skeleton className='col-span-4 h-5 w-24 justify-self-end' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
