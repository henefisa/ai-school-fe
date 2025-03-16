import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssignmentDetailLoading() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-md' />
          <div>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-40 mt-2' />
          </div>
        </div>
        <Skeleton className='h-6 w-24' />
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <Skeleton className='h-4 w-24' />
              </CardTitle>
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-32 mb-1' />
              <Skeleton className='h-4 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-48' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-48 mt-1' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className='h-12 w-full' />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-40' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-36' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
