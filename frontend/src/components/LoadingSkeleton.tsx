import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Placeholder animation while loading articles
export const BlogListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-l-4 border-l-transparent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-5 w-4/5 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="pt-0">
            <Skeleton className="h-6 w-24 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const BlogDetailSkeleton = () => {
  return (
    <div className="bg-white">
      {/* Cover image skeleton */}
      <Skeleton className="w-full rounded-lg mb-8" />
      
      {/* Category and read time */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-12 w-3/4 mb-6" />
      
      {/* Share button skeleton */}
      <Skeleton className="h-10 w-36 mb-8" />
      
      {/* Metadata grid */}
      <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b">
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div>
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-12">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Author skeleton */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
