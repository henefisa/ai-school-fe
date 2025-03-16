import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoursesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px] mt-2" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
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

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <Skeleton className="h-6 w-[180px]" />
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="h-[400px] p-4">
              <div className="grid grid-cols-8 gap-4 pb-4 border-b">
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
              </div>

              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="grid grid-cols-8 gap-4 py-4 border-b">
                    {Array(8)
                      .fill(null)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Skeleton className="h-10 w-[300px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

