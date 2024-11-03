/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Pagination from "@/components/UI/Pagination";
import Card from "@/components/UI/Post/Card";
import { getAllPost } from "@/services/Post";
import { IPost } from "@/types";
import { useEffect, useState } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(3); // Adjust the number of posts per page
  const totalPages = Math.ceil(posts.length / postsPerPage); // Calculate total pages

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getAllPost();
        setPosts(data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <li className="flex items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
        Loading posts...
      </li>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Calculate the current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="flex flex-col gap-5">
        {currentPosts?.map((post: IPost) => (
          <Card key={post._id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default AllPosts;
