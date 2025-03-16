import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MyCoursesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px] mt-2" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[120px]" />
                </CardTitle>
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[50px]" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-[80px]" />
                  <Skeleton className="h-5 w-[40px]" />
                </div>
                <Skeleton className="h-6 w-[200px] mt-2" />
                <Skeleton className="h-4 w-[150px] mt-1" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-1" />
                    <Skeleton className="h-4 w-[180px]" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-1" />
                    <Skeleton className="h-4 w-[120px]" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[60px]" />
                      <Skeleton className="h-4 w-[30px]" />
                    </div>
                    <Skeleton className="h-2 w-full mt-1" />
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-between">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

