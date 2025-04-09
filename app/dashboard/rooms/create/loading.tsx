import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function CreateRoomLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center'>
        <Skeleton className='mr-2 h-9 w-9' />
        <Skeleton className='h-8 w-48' />
      </div>

      <Card className='mx-auto max-w-3xl'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-6 w-6 rounded-full' />
            <Skeleton className='h-6 w-40' />
          </div>
          <Skeleton className='mt-2 h-4 w-full max-w-md' />
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-48' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-48' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-48' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-4 w-48' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-4 w-48' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-24 w-full' />
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Skeleton className='h-10 w-24' />
          <Skeleton className='h-10 w-32' />
        </CardFooter>
      </Card>
    </div>
  );
}
