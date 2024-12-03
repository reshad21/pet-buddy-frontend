/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/lib/AxiosInstance";

export type TFormdata = {
    newPassword: string;
    oldPassword: string;
    confirmPassword: string; // Added confirmPassword
    email: string; // Added email
}


export const forgetPassword = async (formdata: TFormdata) => {
    try {
        const { data } = await axiosInstance.post("/auth/forget-password", { ...formdata });
        return data;
    } catch (error) {
        console.error("Error forget password:", error);
        throw error; // Rethrow the error to handle it later
    }
}