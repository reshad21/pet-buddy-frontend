/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { ICommentData } from "@/types";

export const createComment = async (commentData: ICommentData): Promise<any> => {
    const { post, author, content } = commentData;

    try {
        const { data } = await axiosInstance.post(`/comments/${post}`, {
            post,
            author,
            content,
        });
        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error creating comment:", error);
        throw error; // Rethrow the error to handle it later
    }
};



export const getComment = async (postId: string) => {
    const fetchOption = { next: { tags: ["COMMENTS_TAG"] } };
    const res = await fetch(`${envConfig.baseApi}/comments/${postId}`, fetchOption);
    return res.json();
};
