import { Skeleton } from '@/components/ui/skeleton';

export const BlogCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-card border border-border">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};
