"use client";
import { useGetAllPost } from "@/hooks/post.hook";
import { IPost } from "@/types";
import Link from "next/link";

const PopularPosts = () => {
  const { isSuccess, error, data } = useGetAllPost();

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-4">Popular Posts</h2>
      {error ? (
        <p className="text-red-500">Error fetching posts: {error.message}</p>
      ) : (
        <ul className="space-y-2">
          {isSuccess && data ? (
            data.data
              // Assuming each post has an `upvotes` field
              .sort((a: IPost, b: IPost) => b.upvotes - a.upvotes) // Sort posts by upvotes in descending order
              .slice(0, 5) // Take the top 5 posts
              .map((post: IPost) => (
                <li
                  key={post._id}
                  className="text-blue-900 font-semibold hover:underline"
                >
                  <Link href={`/post/${post._id}`}>{post.title}</Link>
                </li>
              ))
          ) : (
            <li className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
              Loading posts...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default PopularPosts;
