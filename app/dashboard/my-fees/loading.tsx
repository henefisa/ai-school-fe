import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <div>
        <Skeleton className='h-8 w-24' />
        <Skeleton className='mt-2 h-4 w-64' />
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-4 w-4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='mt-1 h-4 w-40' />
          </CardContent>
        </Card>
        <Card className='md:col-span-2'>
          <CardHeader className='pb-3'>
            <Skeleton className='h-5 w-40' />
            <Skeleton className='mt-1 h-4 w-64' />
          </CardHeader>
          <CardContent className='grid gap-1'>
            <div className='flex items-center justify-between py-1'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-20' />
            </div>
            <div className='flex items-center justify-between py-1'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-20' />
            </div>
            <div className='flex items-center justify-between py-1'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-20' />
            </div>
            <div className='flex items-center justify-between py-1'>
              <Skeleton className='h-5 w-24' />
              <Skeleton className='h-5 w-20' />
            </div>
            <div className='flex items-center justify-between border-t py-2'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-5 w-20' />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-4'>
        <Skeleton className='h-10 w-64' />
        <Card>
          <CardHeader>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='mt-1 h-4 w-64' />
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='mt-1 h-4 w-64' />
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className='ml-auto h-10 w-40' />
        </CardFooter>
      </Card>
    </div>
  );
}
