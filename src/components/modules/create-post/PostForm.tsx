"use client"; // Ensure this component is treated as a client component

import { useUser } from "@/context/user.provider";
import { useGetCreatePost } from "@/hooks/createPost.hook";
import { TCreatePostData } from "@/types";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
    // setValue,
    control, // Added control here
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      postImage: "",
      content: "",
      category: "",
    },
  });

  // Use the mutation hook
  const { mutate: createPostMutation, error, isSuccess } = useGetCreatePost();

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    if (!author) {
      toast.error("Author is not defined.");
      return;
    }
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
          <option value="story">Story</option>
          <option value="tip">Tips</option>
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: "Content is required" }}
          render={({ field }) => (
            <ReactQuill
              {...field}
              onChange={(value) => field.onChange(value)}
              className="border rounded w-full"
            />
          )}
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
