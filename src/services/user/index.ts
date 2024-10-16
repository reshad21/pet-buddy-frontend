/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envConfig from "@/config/envConfig";
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
