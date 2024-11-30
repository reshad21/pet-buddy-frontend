/* eslint-disable @typescript-eslint/no-explicit-any */
import { createComment, getComment } from "@/services/Comment";
import { ICommentData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, ICommentData>({
        // Define the mutation function
        mutationFn: async (commentData: ICommentData) => await createComment(commentData),
        onSuccess: () => {
            toast.success("Comment created successfully!");
            // Invalidate relevant queries to refetch updated data
            queryClient.invalidateQueries({ queryKey: ["COMMENTS_TAG"] });
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred while creating the comment.");
        },
    });
};




export const useGetCurrentUserComment = (postId: string) => {
    return useQuery<any, Error>({
        queryKey: ["COMMENTS_TAG", postId],
        queryFn: () => getComment(postId),
    });
};
