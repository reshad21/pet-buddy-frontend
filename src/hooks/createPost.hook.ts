/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/services/Post";
import { TCreatePostData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();

    return useMutation<CreatePostResponse, Error, TCreatePostData>({
        // mutationKey: ["POST_TAG"],
        mutationFn: async (formData: TCreatePostData) => await createPost(formData),
        onSuccess: () => {
            toast.success("Post created successfully."); // Updated message for clarity
            queryClient.invalidateQueries({ queryKey: ['POST_TAG'] }); // Refetch the list of posts
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
