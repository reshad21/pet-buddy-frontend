/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
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
