import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DepartmentDetailLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-md' />
          <Skeleton className='h-9 w-[250px]' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-[150px]' />
          <Skeleton className='h-10 w-[150px]' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <Skeleton className='h-7 w-[200px] mb-2' />
            <Skeleton className='h-5 w-full max-w-[400px]' />
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <Skeleton className='h-6 w-[150px] mb-2' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full mt-2' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='flex items-start gap-2'>
                  <Skeleton className='h-5 w-5 mt-0.5' />
                  <div className='flex-1'>
                    <Skeleton className='h-5 w-[120px] mb-1' />
                    <Skeleton className='h-4 w-full' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-7 w-[150px] mb-2' />
              <Skeleton className='h-5 w-full max-w-[250px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex flex-col space-y-1'>
                    <Skeleton className='h-5 w-[150px] mb-1' />
                    <Skeleton className='h-4 w-[120px]' />
                    <Skeleton className='h-4 w-[180px]' />
                    <Separator className='mt-2' />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className='h-10 w-full' />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className='h-7 w-[100px] mb-2' />
              <Skeleton className='h-5 w-full max-w-[250px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='flex flex-col space-y-1'>
                    <Skeleton className='h-5 w-[180px] mb-1' />
                    <Skeleton className='h-4 w-[120px]' />
                    <Separator className='mt-2' />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className='h-10 w-full' />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
