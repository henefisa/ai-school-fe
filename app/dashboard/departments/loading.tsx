import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function DepartmentsLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <Skeleton className='h-9 w-[200px]' />
        <Skeleton className='h-10 w-[150px]' />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-7 w-[200px] mb-2' />
          <Skeleton className='h-5 w-full max-w-[500px]' />
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between py-4'>
            <Skeleton className='h-10 w-[300px]' />
            <Skeleton className='h-10 w-[100px]' />
          </div>
          <div className='rounded-md border'>
            <div className='h-[400px] relative'>
              <div className='absolute inset-0 flex flex-col'>
                <div className='border-b'>
                  <div className='flex h-12'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className='flex-1 p-4'>
                        <Skeleton className='h-5 w-full' />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='flex-1'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='flex border-b h-16'>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className='flex-1 p-4'>
                          <Skeleton className='h-5 w-full' />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <Skeleton className='h-5 w-[200px]' />
            <div className='space-x-2'>
              <Skeleton className='h-9 w-[80px] inline-block' />
              <Skeleton className='h-9 w-[80px] inline-block' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
