/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { hitFollow } from "@/services/Follow";
import { useState } from "react";
import { toast } from "sonner"; // Import the toast function from sonner

const FollowComponent = ({
  author,
}: {
  author: { _id: string; name: string };
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      // Call the follow service with the author's ID
      await hitFollow(author._id);
      console.log("Successfully followed the user:", author._id);

      // Show success toast notification
      toast.success(`Successfully followed ${author.name}!`);
    } catch (error: any) {
      console.error("Failed to follow user:", error);

      // Handle different error messages
      if (error.message === "Already following this user") {
        toast.info("Already following this user."); // Show info message for already following
      } else {
        toast.error(error.message || "Because already follow"); // Show general error message
      }
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
