/* eslint-disable @typescript-eslint/no-explicit-any */
import { changePassword, forgetPassword, loginUser, registerUser, resetPassword } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_REGISTRATION"],
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: () => {
            toast.success("User registration successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["USER_LOGIN"],
        mutationFn: async (userData) => await loginUser(userData),
        onSuccess: () => {
            toast.success("User login successful.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUserChangePassword = () => {
    return useMutation<void, Error, FieldValues>({
        mutationKey: ["CHANGE_PASSWORD"],
        mutationFn: async (userData) => {
            await changePassword(userData);
        },
        onSuccess: () => {
            toast.success("Password changed successfully.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUserForgetPassword = () => {
    return useMutation<void, Error, FieldValues>({
        mutationKey: ["FORGET_PASSWORD"],
        mutationFn: async (userData) => {
            await forgetPassword(userData);
        },
        onSuccess: () => {
            toast.success("Check your email to get your password!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};


export const useUserResetPassword = () => {
    return useMutation<void, Error, FieldValues>({
        mutationKey: ["RESET_PASSWORD"],
        mutationFn: async (userData) => {
            const { token, ...data } = userData; // Extract token if needed
            await resetPassword(data, token); // Pass token and data to resetPassword
        },
        onSuccess: () => {
            toast.success("Password Reset Successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
