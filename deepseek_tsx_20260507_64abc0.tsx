export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80 rounded-xl"></div>)}
    </div>
  );
}