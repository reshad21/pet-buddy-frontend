/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";

export const getCurrentUserDetailsInfo = async (userId: string) => {
    const fetchOption = {
        next: {
            tags: ["posts"],
        },
    };

    const res = await fetch(
        `${envConfig.baseApi}/users/${userId}`,
        fetchOption
    );

    return res.json();
};

export const getSingleUserAllPosts = async (userId: string) => {
    const fetchOption = {
        next: {
            tags: ["userposts"],
        },
    };

    const res = await fetch(
        `${envConfig.baseApi}/users/posts/${userId}`,
        fetchOption
    );

    return res.json()
}


// get user form axios 

export const getUserFormAxiois = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/users/${id}`);
        return data;
    } catch (error) {
        console.error("Error forget password:", error);
        throw error; // Rethrow the error to handle it later
    }
}
