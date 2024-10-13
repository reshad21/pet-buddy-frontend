/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TUserProfile } from "@/app/(withCommonLayout)/(user)/profile/settings/page";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const updateProfile = async (updateData: TUserProfile, userId: string): Promise<any> => {
    const {
        name,
        img, // Adjusted to match the correct property name
        mobileNumber // Adjusted to match the correct property name
    } = updateData;

    try {
        const { data } = await axiosInstance.patch(`/users/${userId}`, {
            name,
            img, // Map `profilePhoto` to `img` for backend
            mobileNumber
        });

        revalidateTag("UPDATE_PROFILE");

        // Show success toast notification if needed

        return data;
    } catch (error) {
        // Handle error and show error toast if needed
        console.error("Error updating Profile:", error);
        throw error; // Rethrow the error to handle it later
    }
};
