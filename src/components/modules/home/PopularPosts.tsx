"use client";
import { useGetAllPost } from "@/hooks/post.hook";
import { IPost } from "@/types";
import Image from "next/image"; // Import Image component from Next.js
import Link from "next/link";
import PopularPostsSkeleton from "./PopularPostsSkeleton";

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
                <li key={post._id} className="flex items-center space-x-3">
                  {/* Image */}
                  {post.postImage && (
                    <div className="size-14 relative rounded-md overflow-hidden">
                      <Image
                        src={post.postImage}
                        alt={post.title}
                        layout="fill" // Set to fill the parent container
                        objectFit="cover" // Ensure the image covers the container without stretching
                        className="rounded-md"
                      />
                    </div>
                  )}
                  {/* Post Title */}
                  <Link
                    href={`/post/${post._id}`}
                    className="text-slate-700 text-sm font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))
          ) : (
            <li className="">
              <PopularPostsSkeleton />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default PopularPosts;
