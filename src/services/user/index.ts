/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";

export const getCurrentUserDetailsInfo = async (userId: string) => {
    const fetchOption: RequestInit = {
        cache: "no-cache" as RequestCache, // Set cache as 'no-store' with correct type
        next: {
            tags: ["user_details"],
        },
    };

    const res = await fetch(`${envConfig.baseApi}/users/${userId}`, fetchOption);
    return res.json();
};


export const loginUserAllPosts = async (userId: string) => {
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



export const getAllUsers = async (page: number) => {
    const fetchOptions = {
        cache: "no-store" as RequestCache,
    };

    const res = await fetch(`${envConfig.baseApi}/users?page=${page}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
