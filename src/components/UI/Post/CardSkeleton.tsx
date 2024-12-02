const CardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-fit bg-[#f4f6f7] shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Left Side: Image Placeholder */}
      <div className="md:w-1/3 relative h-48 md:h-auto bg-gray-300">
        <div className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"></div>
        <div className="absolute bottom-2 left-2 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm"></div>
      </div>

      {/* Right Side: Content Placeholder */}
      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        {/* Author Information Placeholder */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-300 w-24 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 w-16 rounded"></div>
            </div>
          </div>
          <div className="h-8 w-16 bg-gray-300 rounded"></div>
        </div>

        {/* Post Title and Content Placeholder */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 w-3/4 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-full rounded mb-1"></div>
          <div className="h-4 bg-gray-300 w-5/6 rounded mb-1"></div>
          <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
        </div>

        {/* Vote and Comment Buttons Placeholder */}
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-16 bg-gray-300 rounded mx-2"></div>
        </div>

        {/* Button Placeholder */}
        <div className="mt-4">
          <div className="h-10 bg-gray-300 w-full rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
