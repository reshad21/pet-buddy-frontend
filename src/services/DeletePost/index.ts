/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

// Define a more specific error type for better type safety
interface ApiError {
    message: string;
    status?: number;
}

export const deletePost = async (postId: string) => {
    try {
        // Directly await the delete call
        await axiosInstance.delete(`/post/${postId}`);

        // Revalidate cache tag after successful deletion
        revalidateTag("DELETE_POST");
    } catch (error) {
        // Handle error and show error toast if needed
        const apiError = error as ApiError; // Type assertion
        console.error("Error deleting post:", apiError.message);

        // Optional: You can use a toast notification library to show error messages
        // toast.error(`Failed to delete post: ${apiError.message}`);

        throw apiError; // Rethrow the error to handle it later
    }
};
