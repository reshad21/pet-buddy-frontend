/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { TCreatePostData } from "@/types";
import { revalidateTag } from "next/cache";

export const createPost = async (formData: TCreatePostData): Promise<any> => {
    const { author,
        title,
        postImage,
        content,
        category,
        isPremium } = formData;

    try {
        const { data } = await axiosInstance.post("/post", {
            author,
            title,
            postImage,
            content,
            category,
            isPremium
        });

        revalidateTag("CREATE_POST");

        // Show success toast// Trigger toast notification

        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error creating post:", error);
        throw error; // Rethrow the error to handle it later
    }
};
