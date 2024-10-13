/* eslint-disable @typescript-eslint/no-explicit-any */
import { deletePost } from "@/services/DeletePost";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const useDeletePost = () => {
    return useMutation<any, Error, string>({
        mutationKey: ["DELETE_POST"],
        mutationFn: async (postId: string) => await deletePost(postId),
        onSuccess: () => {
            toast.success("Post deleted successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
