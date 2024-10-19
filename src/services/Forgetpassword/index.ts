/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import axiosInstance from "@/lib/AxiosInstance";

export type TFormdata = {
    newPassword: string;
    oldPassword: string;
}

type TResponse = {
    success: boolean;
    message: string;
};

export const changePassword = async (formdata: TFormdata): Promise<TResponse> => {
    try {
        const { data } = await axiosInstance.post("/forget-password", { ...formdata });
        return data;
    } catch (error) {
        console.error("Error forget password:", error);
        throw error; // Rethrow the error to handle it later
    }
}