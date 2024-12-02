"use client";

const PostDetailsSkeleton = () => {
  return (
    <div className="flex flex-col w-full bg-gray-100 shadow-md rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 md:h-96 bg-gray-300"></div>

      <div className="p-4 space-y-4">
        {/* Author Section Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="w-3/4 h-6 bg-gray-300 rounded"></div>

        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Actions Section Skeleton */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Comments Section Skeleton */}
        <div className="space-y-4">
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="w-full">
                  <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsSkeleton;
