const PopularPostsSkeleton = () => {
  return (
    <div className="mb-4">
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="flex items-center space-x-3">
            {/* Image Skeleton */}
            <div className="size-14 relative rounded-md overflow-hidden bg-gray-300 h-14 w-14"></div>
            {/* Title Skeleton */}
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPostsSkeleton;
