/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/services/CreatePost";
import { TCreatePostData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Define a type for the response that the createPost function returns if applicable
type CreatePostResponse = {
    id: string;
    title: string;
    postImage: string;
    content: string;
    category: string;
    isPremium: boolean;
};

export const useGetCreatePost = () => {
    return useMutation<CreatePostResponse, Error, TCreatePostData>({
        mutationKey: ["CREATE_POST"],
        mutationFn: async (formData: TCreatePostData) => await createPost(formData),
        onSuccess: () => {
            toast.success("Post created successfully."); // Updated message for clarity
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
