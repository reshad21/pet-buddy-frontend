/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDownvote, createUpvote, getDownvote, getUpvote } from "@/services/Votes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//get login user all information from db
export const useCreateUpvote = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
            const vote = await createUpvote(id);
            return vote;
        },
        onSuccess: () => {
            toast.success("Upvote Successfully!");
            queryClient.invalidateQueries({ queryKey: ['upvote'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useCreateDownvote = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
            const vote = await createDownvote(id);
            return vote;
        },
        onSuccess: () => {
            toast.success("Downvote Successfully!");
            queryClient.invalidateQueries({ queryKey: ['downvote'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}


export const useGetUpVote = (postId: string) => {
    return useQuery<any, Error>({
        queryKey: ["upvote", postId],
        queryFn: () => getUpvote(postId),
    });
};

export const useGetDownVote = (postId: string) => {
    return useQuery<any, Error>({
        queryKey: ["downvote", postId],
        queryFn: () => getDownvote(postId),
    });
};
