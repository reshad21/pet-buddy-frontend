/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/context/user.provider";
import { useGetmeByDbId } from "@/hooks/auth.hook";
import { hitFollow } from "@/services/Follow";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FollowComponent = ({
  author,
}: {
  author: { _id: string; name: string };
}) => {
  const { user } = useUser();

  const { mutate: loginUserInfo, data } = useGetmeByDbId();

  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      loginUserInfo(user._id);
    }
  }, [loginUserInfo, user?._id]);

  const handleFollow = async () => {
    try {
      setFollowLoading(true); // Set loading for follow action
      await hitFollow(author._id); // Execute the follow
      toast.success(`Successfully followed ${author.name}!`);
    } catch (error: any) {
      console.error("Failed to follow user:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setFollowLoading(false); // Reset the loading state
    }
  };

  // Check if user is still loading or not available, return loading message
  if (!user) {
    return <div>Loading user...</div>;
  }

  // Ensure that the user data has been fetched before rendering the component
  if (!data) {
    return <div>Loading user information...</div>;
  }

  console.log("LOGIN USER DATA", data.data);

  return (
    <button
      onClick={handleFollow}
      disabled={followLoading} // Disable button when follow action is in progress
      className={`bg-blue-500 text-white text-sm py-1 px-4 rounded-full transition duration-300 ml-4 ${
        followLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      }`}
    >
      {followLoading ? "Following..." : "Follow"}{" "}
      {/* Show the right button text */}
    </button>
  );
};

export default FollowComponent;
