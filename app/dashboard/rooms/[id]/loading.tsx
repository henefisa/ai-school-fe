import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RoomDetailLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center'>
        <Skeleton className='h-10 w-[100px]' />
        <Skeleton className='ml-2 h-10 w-[200px]' />
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <Skeleton className='h-8 w-[200px]' />
              <Skeleton className='mt-2 h-4 w-[300px]' />
            </CardHeader>
            <CardContent className='grid gap-6'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className='h-4 w-[100px]' />
                    <Skeleton className='mt-2 h-6 w-[150px]' />
                  </div>
                ))}
              </div>

              <div>
                <Skeleton className='h-4 w-[100px]' />
                <Skeleton className='mt-2 h-24 w-full' />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-[150px]' />
              <Skeleton className='mt-2 h-4 w-[200px]' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-6 w-full' />
              <Skeleton className='mt-4 h-10 w-full' />
            </CardContent>
          </Card>

          <Card className='mt-6'>
            <CardHeader>
              <Skeleton className='h-6 w-[150px]' />
              <Skeleton className='mt-2 h-4 w-[200px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className='h-4 w-[150px]' />
                    <Skeleton className='mt-2 h-6 w-[100px]' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
