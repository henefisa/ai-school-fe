import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SettingsLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6'>
        <Skeleton className='h-9 w-48' />
        <Skeleton className='mt-2 h-5 w-96' />
      </div>

      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0'>
        <aside className='lg:w-1/4'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-4 w-48' />
            </CardHeader>
            <CardContent className='p-0'>
              <div className='flex flex-col space-y-1 px-2 py-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className='h-9 w-full' />
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className='flex-1'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <Separator />
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className='space-y-2'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-10 w-full' />
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
