import { Skeleton } from "@/ui/design-system";

export function ListItemSkeleton() {
  return (
    <div className="flex items-start gap-3 border border-black/5 rounded-xl p-3">
      <Skeleton className="h-16 w-16 rounded-lg" />
      <div className="flex-1 min-w-0">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
}
