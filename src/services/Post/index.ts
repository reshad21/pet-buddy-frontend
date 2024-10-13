/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { getCurrentUser } from "../AuthService";


export const createPost = async (formData: FormData): Promise<any> => {
    try {
        const { data } = await axiosInstance.post("/items", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        revalidateTag("posts");

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create post");
    }
};

export const getPost = async (postId: string) => {
    let fetchOptions = {};

    fetchOptions = {
        cache: "no-store",
    };

    const res = await fetch(`${envConfig.baseApi}/items/${postId}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export const getMyPosts = async () => {
    const user = await getCurrentUser();

    const res = await axiosInstance.get(`/items?user=${user?._id}`);

    return res.data;
};

//my project code 
export const getAllPost = async () => {
    let fetchOptions = {};

    fetchOptions = {
        cache: "no-store",
    };

    const res = await fetch(`${envConfig.baseApi}/post`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};


export const getSinglePost = async (postId: string): Promise<any> => {
    try {
        const res = await axiosInstance.get(`/post/${postId}`);
        revalidateTag("post");
        revalidateTag("UPDATE_POST");
        revalidateTag("DELETE_POST");
        return res.data;
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching single post:', error);
        throw error; // Re-throw the error if you want to handle it upstream
    }
};