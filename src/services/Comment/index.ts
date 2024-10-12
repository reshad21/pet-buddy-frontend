/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { ICommentData } from "@/types";
import { revalidateTag } from "next/cache";

export const createComment = async (commentData: ICommentData): Promise<any> => {
    const { post, author, content } = commentData;

    try {
        const { data } = await axiosInstance.post(`/comments/${post}`, {
            post,
            author,
            content,
        });

        revalidateTag("comment");

        // Show success toast// Trigger toast notification

        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error creating comment:", error);
        throw error; // Rethrow the error to handle it later
    }
};
