import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-12 w-64 bg-muted rounded animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded animate-pulse" />
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-muted rounded animate-pulse" />
          ))}
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="space-y-3">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
                <div className="h-10 flex-1 bg-muted rounded animate-pulse" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
