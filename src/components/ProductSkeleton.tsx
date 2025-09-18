export const ProductSkeleton = () => {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-muted loading-shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded loading-shimmer"></div>
        <div className="h-6 bg-muted rounded w-3/4 loading-shimmer"></div>
        <div className="h-4 bg-muted rounded w-1/2 loading-shimmer"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-muted rounded w-20 loading-shimmer"></div>
          <div className="h-8 bg-muted rounded w-24 loading-shimmer"></div>
        </div>
      </div>
    </div>
  );
};