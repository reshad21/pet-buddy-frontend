/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/context/user.provider";
import { useGetmeByDbId } from "@/hooks/auth.hook";
import { useFollow, useUnFollow } from "@/hooks/follow.hook";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FollowComponent = ({
  author,
}: {
  author: { _id: string; name: string };
}) => {
  const { user } = useUser(); // Logged-in user data
  const { mutate: loginUserInfo, data } = useGetmeByDbId(); // Fetch user info from DB
  const { mutate: followUser, status: followStatus } = useFollow(); // Follow hook
  const { mutate: unfollowUser, status: unfollowStatus } = useUnFollow(); // Unfollow hook
  const [followLoading, setFollowLoading] = useState(false); // Loading state for follow/unfollow
  const [isFollowingLocal, setIsFollowingLocal] = useState<boolean>(false); // Local state for follow status

  // Fetch user information if logged in
  useEffect(() => {
    if (user?._id) {
      loginUserInfo(user._id);
    }
  }, [loginUserInfo, user?._id]);

  // Set local following status when user data is loaded
  useEffect(() => {
    if (data?.data?.following) {
      setIsFollowingLocal(data.data.following.includes(author._id));
    }
  }, [data, author._id]);

  const handleFollow = async (): Promise<void> => {
    setFollowLoading(true);
    // Optimistically update UI
    setIsFollowingLocal(true);
    try {
      await followUser(author._id); // Perform follow action
      toast.success(`Successfully followed ${author.name}!`);
    } catch (error: any) {
      console.error("Failed to follow user:", error);
      toast.error(error.message || "Something went wrong.");
      // Rollback optimistic update in case of failure
      setIsFollowingLocal(false);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setFollowLoading(true);
    // Optimistically update UI
    setIsFollowingLocal(false);
    try {
      await unfollowUser(author._id); // Perform unfollow action
      toast.success(`Successfully unfollowed ${author.name}!`);
    } catch (error: any) {
      console.error("Failed to unfollow user:", error);
      toast.error(error.message || "Something went wrong.");
      // Rollback optimistic update in case of failure
      setIsFollowingLocal(true);
    } finally {
      setFollowLoading(false);
    }
  };

  // If the user is not logged in, show only the Follow button
  if (!user) {
    return (
      <button
        onClick={handleFollow}
        disabled={followLoading || followStatus === "pending"}
        className={`bg-blue-500 text-white text-sm py-1 px-4 rounded-full transition duration-300 ml-4 ${
          followLoading || followStatus === "pending"
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        {followLoading || followStatus === "pending"
          ? "Processing..."
          : "Follow"}
      </button>
    );
  }

  // Ensure the user data is fetched before rendering follow/unfollow logic
  if (!data) {
    return (
      <div className="flex justify-center items-center">
        <div className="size-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <button
      onClick={isFollowingLocal ? handleUnfollow : handleFollow} // Toggle follow/unfollow
      disabled={
        followLoading ||
        followStatus === "pending" ||
        unfollowStatus === "pending"
      }
      className={`bg-blue-500 text-white text-sm py-1 px-4 rounded-full transition duration-300 ml-4 ${
        followLoading ||
        followStatus === "pending" ||
        unfollowStatus === "pending"
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-600"
      }`}
    >
      {followLoading ||
      followStatus === "pending" ||
      unfollowStatus === "pending"
        ? "Processing..."
        : isFollowingLocal
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowComponent;
