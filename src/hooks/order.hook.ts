/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCreatedOrder } from "@/services/Order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCreatedOrder = (page: number = 1) => {
    return useMutation<any, Error, void>({
        mutationKey: ["GETALL_ORDER"],
        mutationFn: async () => await getAllCreatedOrder(page), // Ensure postId is a string
        onSuccess: () => {
            toast.success("All Created order fetched successfully."); // Update the message for clarity
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
};
