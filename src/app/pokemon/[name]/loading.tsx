export default function Loading() {
  return (
    <div className="p-6 max-w-xl mx-auto animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="h-64 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
}
