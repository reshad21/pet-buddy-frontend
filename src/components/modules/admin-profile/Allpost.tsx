"use client";

import Card from "@/components/UI/Post/Card";
import { useUser } from "@/context/user.provider";
import { useGetAllPost } from "@/hooks/getAllPost.hook"; // Assuming this is the custom hook
import { IPost } from "@/types";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { user } = useUser();

  // Use the custom hook to get posts and handle loading, error, and pagination
  const { data, isLoading, isError, isSuccess } = useGetAllPost(page);

  useEffect(() => {
    if (data && data.data.length === 0) {
      setHasMore(false); // No more posts to load
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        if (hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1); // Increment page number
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load posts. Please try again later.
      </p>
    );
  }

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        <p className="ml-2">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 rounded-md">
      {isSuccess && data?.data.length > 0 ? (
        data.data.map((post: IPost) => (
          <Card key={post._id} post={post} user={user} />
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
      {isLoading && page > 1 && (
        <div className="flex justify-center items-center mt-5">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <p className="ml-2">Loading more posts...</p>
        </div>
      )}
      {!hasMore && !isLoading && (
        <p className="text-center text-gray-500 mt-5">No more posts to load.</p>
      )}
    </div>
  );
};

export default AllPosts;
