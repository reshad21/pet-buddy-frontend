/* eslint-disable @typescript-eslint/no-explicit-any */
import { deletePost } from "@/services/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationKey: ["POST_TAG"],
        mutationFn: async (postId: string) => {
            await deletePost(postId);
        },
        onSuccess: () => {
            toast.success("Post deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["POST_TAG"] });
            queryClient.refetchQueries({ queryKey: ["POST_TAG"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred.");
        },
    });
};
