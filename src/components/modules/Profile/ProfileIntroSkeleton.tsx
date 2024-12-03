import { FC } from "react";

const ProfileIntroSkeleton: FC = () => {
  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <div className="animate-pulse">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>

        {/* Email */}
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>

        {/* Mobile Number */}
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>

        {/* Stats */}
        <div className="flex justify-between mt-4">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        </div>

        {/* Edit Button */}
        <div className="h-12 bg-gray-300 rounded w-full mt-6"></div>
      </div>
    </div>
  );
};

export default ProfileIntroSkeleton;
