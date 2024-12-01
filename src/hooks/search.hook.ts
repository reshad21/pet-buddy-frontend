/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchPosts } from "@/services/Post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetSearchPost = () => {
    return useMutation<any, Error, string>({
        // mutationKey: ["SEARCH_DETAILS"],
        mutationFn: async (searchTerm: string) => await searchPosts(searchTerm),
        onSuccess: () => {
            toast.success("Search post fetched successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
