import Pagination from "@/components/UI/Pagination";
import { TCreatePostData } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface TableProps {
  data: TCreatePostData[];
  onEdit: (post: TCreatePostData) => void;
  onDelete: (postId: string) => void;
}

const PostTable: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  //Pagination work step-1
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(4); // Adjust the number of posts per page
  const totalPages = data ? Math.ceil(data.length / postsPerPage) : 0;
  // Pagination logic step-2
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticls = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Post Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentArticls.map((post) => (
            <tr key={post._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 text-sm text-gray-700">
                {post.category}
              </td>
              <td className="px-6 py-4">
                {post.postImage && (
                  <Image
                    width={50}
                    height={50}
                    src={post.postImage}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{post.title}</td>
              <td className="px-6 py-4 space-x-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(post)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (post._id) {
                        onDelete(post._id);
                      } else {
                        console.error("Post ID is undefined.");
                      }
                    }}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default PostTable;
