import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoomsLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='mt-2 h-4 w-64' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      <Card className='mt-6'>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-40' />
          </CardTitle>
          <Skeleton className='h-4 w-full max-w-md' />
        </CardHeader>
        <CardContent>
          <div className='mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <Skeleton className='h-10 w-full max-w-sm' />
            <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
              <Skeleton className='h-10 w-[180px]' />
              <Skeleton className='h-10 w-[180px]' />
            </div>
          </div>

          <div className='rounded-md border'>
            <div className='h-10 border-b bg-muted/50 px-4'>
              <div className='flex h-full items-center'>
                <Skeleton className='h-4 w-[10%]' />
                <Skeleton className='ml-4 h-4 w-[15%]' />
                <Skeleton className='ml-4 h-4 w-[20%]' />
                <Skeleton className='ml-4 h-4 w-[10%]' />
                <Skeleton className='ml-4 h-4 w-[10%]' />
                <Skeleton className='ml-4 h-4 w-[10%]' />
                <Skeleton className='ml-auto h-4 w-[10%]' />
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className='border-b p-4'>
                <div className='flex items-center'>
                  <Skeleton className='h-4 w-[10%]' />
                  <Skeleton className='ml-4 h-4 w-[15%]' />
                  <Skeleton className='ml-4 h-4 w-[20%]' />
                  <Skeleton className='ml-4 h-4 w-[10%]' />
                  <Skeleton className='ml-4 h-4 w-[10%]' />
                  <Skeleton className='ml-4 h-4 w-[10%]' />
                  <Skeleton className='ml-auto h-8 w-8 rounded-full' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
