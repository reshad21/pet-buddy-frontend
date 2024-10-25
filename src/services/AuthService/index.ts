/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/register", userData);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const logout = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);
        return {
            _id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            mobileNumber: decodedToken.mobileNumber,
            role: decodedToken.role,
            status: decodedToken.status,
            profilePhoto: decodedToken.img,
            followers: decodedToken.followers,
            following: decodedToken.following,
            posts: decodedToken.posts,
            __v: decodedToken.__v,
        };
    }

    return decodedToken;
};



export const changePassword = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/change-password", { ...userData });
        return data;
    } catch (error) {
        console.error("Error forget password:", error);
        throw error; // Rethrow the error to handle it later
    }
}

// export const getCurrentUserDetailsInfo = async (postId: string): Promise<any> => {
//     try {
//         const token = cookies().get("accessToken")?.value; // Get the token

//         const res = await axiosInstance.get(`/users/${postId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the headers
//             },
//         });

//         return res.data;
//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error('Error fetching single post:', error);
//         throw error; // Re-throw the error if you want to handle it upstream
//     }
// };