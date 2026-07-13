import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export { Skeleton };

export function CardSkeleton({ count = 1, height = 200 }: { count?: number; height?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-card border border-border/60 rounded-lg shadow-sm space-y-3"
        >
          <Skeleton height={24} width="40%" />
          <Skeleton height={16} count={2} />
          <Skeleton height={20} width="60%" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="flex-1">
              <Skeleton height={40} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 bg-card border border-border/60 rounded-lg shadow-sm">
          <Skeleton height={16} width="60%" />
          <Skeleton height={32} width="50%" style={{ marginTop: "8px" }} />
        </div>
      ))}
    </div>
  );
}
