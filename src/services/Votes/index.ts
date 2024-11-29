"use server"
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";

export const createUpvote = async (postId: string): Promise<{ message: string }> => {
    const { data } = await axiosInstance.post(`/vote/upvote/${postId}`);
    return data;
};

export const createDownvote = async (postId: string): Promise<{ message: string }> => {
    const { data } = await axiosInstance.post(`/vote/downvote/${postId}`);
    return data;
};

export const getUpvote = async (postId: string) => {
    const fetchOption = { next: { tags: ["upvote"] } };
    const res = await fetch(`${envConfig.baseApi}/vote/upvote/${postId}`, fetchOption);
    return res.json();
};

export const getDownvote = async (postId: string) => {
    const fetchOption = { next: { tags: ["downvote"] } };
    const res = await fetch(`${envConfig.baseApi}/vote/downvote/${postId}`, fetchOption);
    return res.json();
};
