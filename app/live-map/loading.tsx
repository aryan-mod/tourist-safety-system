import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function LiveMapLoading() {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header Skeleton */}
      <div className="flex-shrink-0 p-4 border-b border-border/50 bg-card/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-9 w-20" />
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-3">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Skeleton */}
      <div className="flex-1 relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
