/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const hitFollow = async (followerId: string): Promise<any> => {
    try {
        console.log("received follwerid==>", followerId);
        const { data } = await axiosInstance.post(`users/follow/${followerId}`);

        revalidateTag("follow");

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create follow");
    }
};


//this will need profile information
export const getFollowers = async (userId: string) => {
    const fetchOption = {
        next: {
            tags: ["follow"],
        },
    };

    const res = await fetch(
        `${envConfig.baseApi}/follow${userId}`,
        fetchOption
    );

    return res.json();
};



