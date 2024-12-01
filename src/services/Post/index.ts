/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { TCreatePostData } from "@/types";
import { getCurrentUser } from "../AuthService";


// export const createPost = async (formData: FormData): Promise<any> => {
//     try {
//         const { data } = await axiosInstance.post("/items", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });

//         revalidateTag("posts");

//         return data;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Failed to create post");
//     }
// };


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

        revalidateTag("POST_TAG");

        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error creating post:", error);
        throw error; // Rethrow the error to handle it later
    }
};


export const getMyPosts = async () => {
    const user = await getCurrentUser();
    const res = await axiosInstance.get(`/items?user=${user?._id}`);
    return res.data;
};

export const getAllPost = async (page: number) => {
    const fetchOptions = {
        cache: "no-store" as RequestCache,
    };
    const res = await fetch(`${envConfig.baseApi}/post?page=${page}`, fetchOptions);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};



export const getSinglePost = async (postId: string): Promise<any> => {
    try {
        const res = await axiosInstance.get(`/post/${postId}`);
        return res.data;
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching single post:', error);
        throw error; // Re-throw the error if you want to handle it upstream
    }
};


export const searchPosts = async (searchData: string) => {
    let fetchOptions = {};

    fetchOptions = {
        cache: "no-store",
    };

    const res = await fetch(`${envConfig.baseApi}/post?searchTerm=${searchData}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};


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
        revalidateTag("POST_TAG");
        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error updating post:", error);
        throw error; // Rethrow the error to handle it later
    }
};


export const deletePost = async (postId: string) => {
    try {
        await axiosInstance.delete(`/post/${postId}`);
        revalidateTag("POST_TAG");
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};