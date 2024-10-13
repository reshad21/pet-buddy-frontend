"use client";
import { useGetAllPost } from "@/hooks/getAllPost.hook";
import { IPost } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

const PopularPosts = () => {
  const { mutate: getPosts, isSuccess, error, data } = useGetAllPost();

  // Fetch posts when the component mounts
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // Log fetched posts data for debugging
  console.log("Fetched posts for widget-->", data?.data);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-4">Popular Posts</h2>
      {error ? (
        <p className="text-red-500">Error fetching posts: {error.message}</p>
      ) : (
        <ul className="space-y-2">
          {isSuccess && data ? (
            data?.data.slice(0, 5).map(
              (
                post: IPost // Show only the first 5 posts
              ) => (
                <li key={post._id} className="text-blue-600 hover:underline">
                  <Link href={`/post/${post._id}`}>{post.title}</Link>
                </li>
              )
            )
          ) : (
            <p>Loading posts...</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default PopularPosts;
