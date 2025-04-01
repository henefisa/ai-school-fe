import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function EditDepartmentLoading() {
  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center gap-2 mb-6'>
        <Skeleton className='h-10 w-10 rounded-md' />
        <Skeleton className='h-9 w-[200px]' />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className='h-7 w-[200px] mb-2' />
          <Skeleton className='h-5 w-full max-w-[500px]' />
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`space-y-2 ${
                  i === 2 || i === 5 ? 'md:col-span-2' : ''
                }`}
              >
                <Skeleton className='h-5 w-[150px]' />
                <Skeleton
                  className={`h-10 w-full ${i === 2 ? 'h-[100px]' : ''}`}
                />
              </div>
            ))}
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
