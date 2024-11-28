/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSinglePost } from "@/services/Post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
