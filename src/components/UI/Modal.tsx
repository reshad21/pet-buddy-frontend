"use client";
import { updatePost } from "@/services/Post";
import { TCreatePostData } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: TCreatePostData | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
  const { register, handleSubmit, reset } = useForm<TCreatePostData>({
    defaultValues: post || {}, // Set default values to the post data
  });

  const onSubmit = (modalData: TCreatePostData) => {
    // Handle the form submission for updating the post
    console.log("Updated Post Data:", modalData);
    if (modalData?._id) {
      updatePost(modalData, modalData?._id);
    }

    // Here you would typically call your update API
    onClose(); // Close the modal after submission
  };

  React.useEffect(() => {
    if (post) {
      reset(post); // Reset form with new post data when post changes
    }
  }, [post, reset]);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              {...register("category", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="postImage"
            >
              Post Image URL
            </label>
            <input
              type="text"
              id="postImage"
              {...register("postImage", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              {...register("content", { required: true })}
              rows={7}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2 resize-none"
              placeholder="Enter your post content here..."
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
