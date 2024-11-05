/* eslint-disable @typescript-eslint/no-explicit-any */
import { deletePost } from "@/services/DeletePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationKey: ["DELETE_POST"],
        mutationFn: async (postId: string) => {
            await deletePost(postId);
        },
        onSuccess: () => {
            toast.success("Post deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["GET_ALL_POSTS"] });
            queryClient.refetchQueries({ queryKey: ["GET_ALL_POSTS"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred.");
        },
    });
};
