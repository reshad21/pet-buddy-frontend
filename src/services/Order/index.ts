/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envConfig from "@/config/envConfig";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const createOrder = async (orderData: any): Promise<any> => {
    const { user, article } = orderData;

    try {
        const { data } = await axiosInstance.post("/order/create", {
            user, article
        });

        revalidateTag("order");
        return data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};


export const getAllCreatedOrder = async (page: number) => {
    const fetchOptions = {
        cache: "no-store" as RequestCache,
    };

    const res = await fetch(`${envConfig.baseApi}/order?page=${page}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
