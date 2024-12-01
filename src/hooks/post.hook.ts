/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, deletePost, getAllPost, getSinglePost } from "@/services/Post";
import { loginUserAllPosts } from "@/services/user";
import { IPost, TCreatePostData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useGetAllPost = (page: number = 1) => {
    return useQuery<any, Error>({
        queryKey: ["POST_TAG", page], // Use page as part of the queryKey for pagination
        queryFn: async () => await getAllPost(page), // Make sure this function returns data of type IPostResponse
    });
};


export const useGetSinglePostDetails = () => {
    return useMutation<any, Error, string>({
        // mutationKey: ["POST_DETAILS"],
        mutationFn: async (postId: string) => await getSinglePost(postId), // Ensure postId is a string
        onSuccess: () => {
            toast.success("Post details fetched successfully."); // Update the message for clarity
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};



export const useGetCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, TCreatePostData>({
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


export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: async (postId: string) => {
            await deletePost(postId); // Delete the post from the API
        },
        onMutate: (postId) => {
            // Optimistic update: Remove the post from the cache immediately
            queryClient.setQueryData<IPost[]>(["POST_TAG"], (oldPosts = []) => {
                return oldPosts.filter((post) => post._id !== postId);
            });
            toast.success("Post deleted successfully.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["POST_TAG"] }); // Refetch data after mutation success
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred.");
        },
    });
};


//login user dashboard hook
export const useGetLoginUserAllPost = (userId: string) => {
    return useQuery<any, Error>({
        queryKey: ["POST_TAG", userId], // Use page as part of the queryKey for pagination
        queryFn: async () => await loginUserAllPosts(userId), // Make sure this function returns data of type IPostResponse
    });
};