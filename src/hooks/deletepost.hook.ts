import { deletePost } from "@/services/Post";
import { IPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
