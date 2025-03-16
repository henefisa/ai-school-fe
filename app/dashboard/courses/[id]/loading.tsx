import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CourseDetailsLoading() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-10 w-10 rounded-md' />
          <Skeleton className='h-8 w-[350px]' />
          <Skeleton className='h-6 w-[80px] ml-2 rounded-full' />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-10 w-[120px]' />
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-7'>
        <div className='md:col-span-5 space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-[150px]' />
              <Skeleton className='h-4 w-[250px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <Skeleton className='h-5 w-[100px]' />
                  <Skeleton className='h-4 w-full mt-1' />
                  <Skeleton className='h-4 w-[80%] mt-1' />
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i}>
                        <Skeleton className='h-5 w-[100px]' />
                        <Skeleton className='h-4 w-[150px] mt-1' />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue='students' className='w-full'>
            <TabsList className='grid grid-cols-4 w-full'>
              <TabsTrigger value='students' disabled>
                Students
              </TabsTrigger>
              <TabsTrigger value='materials' disabled>
                Materials
              </TabsTrigger>
              <TabsTrigger value='assignments' disabled>
                Assignments
              </TabsTrigger>
              <TabsTrigger value='announcements' disabled>
                Announcements
              </TabsTrigger>
            </TabsList>

            <TabsContent value='students' className='mt-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between'>
                  <div>
                    <Skeleton className='h-6 w-[150px]' />
                    <Skeleton className='h-4 w-[200px] mt-1' />
                  </div>
                  <Skeleton className='h-10 w-[120px]' />
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-4 gap-4 pb-4'>
                      {Array(4)
                        .fill(null)
                        .map((_, i) => (
                          <Skeleton key={i} className='h-4 w-full' />
                        ))}
                    </div>

                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className='grid grid-cols-4 gap-4 py-4 border-b'
                        >
                          <div className='flex items-center space-x-2'>
                            <Skeleton className='h-8 w-8 rounded-full' />
                            <Skeleton className='h-4 w-[150px]' />
                          </div>
                          <Skeleton className='h-4 w-[50px]' />
                          <Skeleton className='h-4 w-[50px]' />
                          <Skeleton className='h-8 w-[60px] ml-auto' />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-[100px]' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center space-y-3'>
                <Skeleton className='h-20 w-20 rounded-full' />
                <div className='text-center'>
                  <Skeleton className='h-5 w-[150px]' />
                  <Skeleton className='h-4 w-[180px] mt-1' />
                </div>
                <Skeleton className='h-10 w-full' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-[100px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className='flex items-start space-x-2'>
                      <Skeleton className='h-4 w-4 mt-0.5' />
                      <div>
                        <Skeleton className='h-5 w-[100px]' />
                        <Skeleton className='h-4 w-[150px] mt-1' />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-[120px]' />
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {Array(2)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i}>
                      <div className='flex items-center justify-between'>
                        <Skeleton className='h-4 w-[100px]' />
                        <Skeleton className='h-4 w-[50px]' />
                      </div>
                      <Skeleton className='h-2 w-full mt-2' />
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
