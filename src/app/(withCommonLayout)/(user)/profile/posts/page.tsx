"use client";

import PostTable from "@/components/modules/dashboard/PostTable";
import Modal from "@/components/UI/Modal";
import { useUser } from "@/context/user.provider";
import { useDeletePost, useGetLoginUserAllPost } from "@/hooks/post.hook";
import { TCreatePostData } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PostPage = () => {
  const { user } = useUser();
  const { data: userAllPosts, isLoading } = useGetLoginUserAllPost(
    user?._id as string
  );
  const { mutate: deletePost, error, isSuccess } = useDeletePost();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<TCreatePostData | null>(
    null
  );

  const handleEditClick = (post: TCreatePostData) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (postId: string) => {
    deletePost(postId);
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
    setSelectedPost(null);
  };

  if (isLoading) {
    return <p className="text-gray-600">Loading posts...</p>;
  }

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-300 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Posts</h2>
      {userAllPosts.data && userAllPosts.data.length > 0 ? (
        <PostTable
          data={userAllPosts.data}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
};

export default PostPage;
