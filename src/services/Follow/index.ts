/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";

// Function to handle following a user
export const hitFollow = async (followerId: string): Promise<any> => {
    try {
        const { data } = await axiosInstance.post(`users/follow/${followerId}`);
        return data;
    } catch (error: any) {
        console.error("Error following user:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to create follow");
    }
};

// Function to handle unfollowing a user
export const hitUnfollow = async (followerId: string): Promise<any> => {
    try {
        const { data } = await axiosInstance.post(`users/unfollow/${followerId}`);
        return data; // Return the response data
    } catch (error: any) {
        console.error("Error unfollowing user:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to create unfollow");
    }
};
