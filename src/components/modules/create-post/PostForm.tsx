"use client"; // Ensure this component is treated as a client component

import { useUser } from "@/context/user.provider";
import { useGetCreatePost } from "@/hooks/createPost.hook";
import { TCreatePostData } from "@/types"; // Import the custom hook
import dynamic from "next/dynamic"; // Import dynamic for lazy loading
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type PostFormValues = {
  title: string;
  postImage: string;
  content: string;
  category: string;
  isPremium: boolean;
};

const PostForm: React.FC = () => {
  const { user } = useUser();
  const author = user?._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "How to feed friend with benefit pussy cat3?",
      postImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      content:
        "This post provides tips on take care your cat to ensure longevity and safety.",
      category: "Story",
      isPremium: true,
    },
  });

  // Use the mutation hook
  const { mutate: createPostMutation, error, isSuccess } = useGetCreatePost();

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    const formData: TCreatePostData = {
      author,
      title: data.title,
      postImage: data.postImage,
      content: data.content,
      category: data.category,
      isPremium: data.isPremium,
    };

    console.log("actual form data-->", formData);
    createPostMutation(formData);
  };

  useEffect(() => {
    if (error) {
      toast.info("Submitting post...");
    }

    if (isSuccess) {
      toast.success("Post submitted successfully!");
    }
  }, [error, isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          type="text"
          className="border p-2 rounded w-full"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="postImage">Post Image URL:</label>
        <input
          id="postImage"
          {...register("postImage", { required: "Post image URL is required" })}
          type="url"
          className="border p-2 rounded w-full"
        />
        {errors.postImage && (
          <p className="text-red-500">{errors.postImage.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="isPremium"
          {...register("isPremium")}
          type="checkbox"
          className="mr-2"
        />
        <label htmlFor="isPremium">Is Premium</label>
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a category</option>
          <option value="Story">Story</option>
          <option value="Advice">Advice</option>
          <option value="Tips">Tips</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <ReactQuill
          id="content"
          {...register("content", { required: "Content is required" })}
          onChange={(value) => setValue("content", value)} // Update the value
          className="border rounded w-full"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
