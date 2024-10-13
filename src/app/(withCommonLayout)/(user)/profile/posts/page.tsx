"use client";
import Modal from "@/components/UI/Modal"; // Adjust the path according to your project structure
import { useUser } from "@/context/user.provider";
import { useDeletePost } from "@/hooks/deletepost.hook";
import { getSingleUserAllPosts } from "@/services/user";
import { TCreatePostData } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PostPage = () => {
  const { user } = useUser();
  const [userAllPosts, setAllUserPost] = useState<TCreatePostData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TCreatePostData | null>(
    null
  );

  useEffect(() => {
    if (user && user._id) {
      getSingleUserAllPosts(user._id)
        .then((details) => {
          console.log("Fetched posts:", details?.data);
          setAllUserPost(details?.data); // Assuming details is an array of posts
        })
        .catch((error) => console.error("Error fetching user posts:", error));
    }
  }, [user]);

  const handleEditClick = (post: TCreatePostData) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const { mutate: deletepost, error, isSuccess } = useDeletePost();

  const handleDeletClick = (postId: string) => {
    console.log("show deleted id===>", postId);
    // deletePost(postId);
    deletepost(postId);
  };

  useEffect(() => {
    if (error) {
      toast.info("Deleting post...");
    }

    if (isSuccess) {
      toast.success("Post deleted successfully!");
    }
  }, [error, isSuccess]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null); // Clear selected post when closing modal
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Posts</h2>
      {userAllPosts.length > 0 ? (
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
            {userAllPosts.map((post: TCreatePostData) => (
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
                <td className="px-6 py-4 text-sm text-gray-700">
                  {post.title}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300">
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(post)} // Open modal with the post data
                      className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletClick(post._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}

      {/* Modal for editing post */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
};

export default PostPage;
