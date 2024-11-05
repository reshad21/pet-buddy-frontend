"use client";
import Pagination from "@/components/UI/Pagination";
import { useDeletePost } from "@/hooks/deletepost.hook";
import { useGetAllPost } from "@/hooks/getAllPost.hook";
import { IPost } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const PaymentHistoryPage = () => {
  const { mutate: allPost, data } = useGetAllPost();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5); // Adjust the number of posts per page

  const totalPages = data ? Math.ceil(data.data.length / postsPerPage) : 0;

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.data.slice(indexOfFirstPost, indexOfLastPost);

  // Fetch posts when the component mounts
  useEffect(() => {
    allPost();
  }, [allPost]);

  const { mutate: deletepost } = useDeletePost();

  const handleDelete = (postId: string) => {
    deletepost(postId);
  };

  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4">All Posts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts && currentPosts.length > 0 ? (
                currentPosts.map((post: IPost) => (
                  <tr key={post._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {post.postImage && (
                        <Image
                          width={40}
                          height={40}
                          src={post.postImage}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{post.title}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No posts available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default PaymentHistoryPage;
