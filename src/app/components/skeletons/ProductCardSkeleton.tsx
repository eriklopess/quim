import { Skeleton } from "@/ui/design-system";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 p-3">
      <Skeleton className="h-44 w-full rounded-xl mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}
