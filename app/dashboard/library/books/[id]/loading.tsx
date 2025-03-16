import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function BookDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="mt-2 h-6 w-1/2" />
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-full" />
            </div>

            <Skeleton className="h-1 w-full" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Skeleton className="h-6 w-40" />
                <div className="mt-2 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-40" />
                <div className="mt-2 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Skeleton className="h-1 w-full" />

            <div>
              <Skeleton className="h-6 w-40" />
              <div className="mt-4 space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="mt-1 h-4 w-24" />
                    <Skeleton className="mt-2 h-4 w-full" />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

