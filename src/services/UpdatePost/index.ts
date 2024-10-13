/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { TCreatePostData } from "@/types";
import { revalidateTag } from "next/cache";

export const updatePost = async (modalData: TCreatePostData, postId: string): Promise<any> => {
    const {
        title,
        postImage,
        content,
        category } = modalData;

    try {
        const { data } = await axiosInstance.patch(`/post/${postId}`, {
            title,
            postImage,
            content,
            category,
        });

        revalidateTag("UPDATE_POST");

        // Show success toast// Trigger toast notification

        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error updating post:", error);
        throw error; // Rethrow the error to handle it later
    }
};
