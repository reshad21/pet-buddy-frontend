/* eslint-disable @typescript-eslint/no-explicit-any */
import { hitFollow, hitUnfollow } from "@/services/Follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

//get login user all information from db
export const useFollow = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
            const follow = await hitFollow(id);
            return follow;
        },
        onSuccess: () => {
            toast.success("Follow author Successfully!");
            queryClient.invalidateQueries({ queryKey: ['FOLLOW_STATUS'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useUnFollow = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: async (id) => {
            const follow = await hitUnfollow(id);
            return follow;
        },
        onSuccess: () => {
            toast.success("Unfollow author Successfully!");
            queryClient.invalidateQueries({ queryKey: ['FOLLOW_STATUS'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}