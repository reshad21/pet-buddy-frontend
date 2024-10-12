/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createUpvote = async (postId: string): Promise<any> => {
    try {
        const { data } = await axiosInstance.post(`/vote/upvote/${postId}`);

        revalidateTag("vote");

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create upvote");
    }
};



export const getUpvote = async () => {
    const fetchOption = {
        next: {
            tags: ["vote"],
        },
    };

    const res = await fetch(
        `${envConfig.baseApi}/vote/upvote`,
        fetchOption
    );

    return res.json();
};



export const createDownvote = async (postId: string): Promise<any> => {
    try {
        const { data } = await axiosInstance.post(`/vote/downvote/${postId}`);

        revalidateTag("vote");

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create downvote");
    }
};



export const getDownvote = async () => {
    const fetchOption = {
        next: {
            tags: ["vote"],
        },
    };

    const res = await fetch(
        `${envConfig.baseApi}/vote/downvote`,
        fetchOption
    );

    return res.json();
};