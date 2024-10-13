/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchPosts } from "@/services/Post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetSearchPost = () => {
    return useMutation<any, Error, string>({
        mutationKey: ["SEARCH_DETAILS"],
        mutationFn: async (searchTerm: string) => await searchPosts(searchTerm), // Ensure postId is a string
        onSuccess: () => {
            toast.success("Search post fetched successfully."); // Update the message for clarity
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
