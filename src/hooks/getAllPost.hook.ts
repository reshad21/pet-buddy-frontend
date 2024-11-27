/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPost } from "@/services/Post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllPost = (page: number = 1) => {
    return useMutation<any, Error, void>({
        mutationKey: ["POST_TAG"],
        mutationFn: async () => await getAllPost(page), // Ensure postId is a string
        onSuccess: () => {
            toast.success("All posts fetched successfully."); // Update the message for clarity
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};
