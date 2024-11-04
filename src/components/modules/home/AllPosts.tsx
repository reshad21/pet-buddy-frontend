/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Card from "@/components/UI/Post/Card";
import { getAllPost } from "@/services/Post";
import { IPost } from "@/types";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch posts function
  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    try {
      const { data } = await getAllPost(pageNum);
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and load more on scroll
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        if (hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 rounded-md">
      {posts.map((post: IPost) => (
        <Card key={post._id} post={post} />
      ))}
      {loading && (
        <li className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          Loading posts...
        </li>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500">No more posts to load.</p>
      )}
    </div>
  );
};

export default AllPosts;
