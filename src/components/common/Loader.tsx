export const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-600 text-center">Loading...</p>
        </div>
      </div>
    );
  };
  
  export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="animate-pulse flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  