import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function RoomEditLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center'>
        <Skeleton className='h-10 w-[100px]' />
        <Skeleton className='ml-2 h-10 w-[200px]' />
      </div>

      <Card className='mx-auto max-w-3xl'>
        <CardHeader>
          <Skeleton className='h-8 w-[200px]' />
          <Skeleton className='mt-2 h-4 w-[300px]' />
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-10 w-full' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-10 w-full' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-[100px]' />
            <Skeleton className='h-24 w-full' />
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Skeleton className='h-10 w-[100px]' />
          <Skeleton className='h-10 w-[150px]' />
        </CardFooter>
      </Card>
    </div>
  );
}
