"use client";
import { hitFollow } from "@/services/Follow";
import { useState } from "react";

const FollowComponent = ({ author }: { author: { _id: string } }) => {
  // const { user } = useUser();
  console.log("Get author id from card-->", author._id);

  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      // Only pass the followee ID to hitFollow
      await hitFollow(author._id);
      console.log("Successfully followed the user:", author._id);
      // Optionally show a success message
      alert(`Successfully followed ${author._id}`);
    } catch (error) {
      console.error("Failed to follow user:", error);
      // Optionally show an error message to the user
      alert(`Failed to follow user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`bg-blue-500 text-white text-sm py-1 px-4 rounded-full transition duration-300 ml-4 ${
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      }`}
    >
      {isLoading ? "Following..." : "Follow"}
    </button>
  );
};

export default FollowComponent;
