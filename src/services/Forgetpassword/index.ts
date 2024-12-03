/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axiosInstance from "@/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";



export const forgetPassword = async (forgetdata: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/forget-password", { ...forgetdata });
        return data;
    } catch (error) {
        console.error("Error forget password:", error);
        throw error; // Rethrow the error to handle it later
    }
}