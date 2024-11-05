"use client";
import Pagination from "@/components/UI/Pagination";
import { useGetAllUser } from "@/hooks/auth.hook";
import { IUser } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const AllUserPage = () => {
  const { mutate: allUser, data } = useGetAllUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5); // Adjust the number of posts per page

  const totalPages = data ? Math.ceil(data.data.length / postsPerPage) : 0;

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = data?.data.slice(indexOfFirstPost, indexOfLastPost);

  // Fetch posts when the component mounts
  useEffect(() => {
    allUser();
  }, [allUser]);

  return (
    <>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-4">All Posts</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers && currentUsers.length > 0 ? (
                currentUsers?.map((user: IUser) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {user.img && (
                        <Image
                          width={40}
                          height={40}
                          src={user.img}
                          alt={user.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Block
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

export default AllUserPage;
