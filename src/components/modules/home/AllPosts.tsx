"use client";

import Pagination from "@/components/UI/Pagination";
import Card from "@/components/UI/Post/Card";
import { useUser } from "@/context/user.provider";
import { useGetAllPost } from "@/hooks/post.hook";
import { IPost } from "@/types";
import { useState } from "react";

const AllPosts = () => {
  const { user } = useUser();
  const { data, isError } = useGetAllPost();

  //Pagination work step-1
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(3); // Adjust the number of posts per page
  const totalPages = data ? Math.ceil(data.data.length / postsPerPage) : 0;
  // Pagination logic step-2
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticls = data?.data.slice(indexOfFirstPost, indexOfLastPost);

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load posts. Please try again later.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5 bg-gray-100 p-5 rounded-md">
      {currentArticls && currentArticls.length > 0 ? (
        currentArticls?.map((post: IPost) => (
          <Card key={post._id} post={post} user={user} />
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllPosts;
