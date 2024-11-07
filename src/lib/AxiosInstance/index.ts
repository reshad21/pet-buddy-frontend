"use server";
import envConfig from "@/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
    baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
    function (config) {
        const cookieStore = cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );


// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
    function (response) {
        return response;  // Return the response if it is successful
    },
    function (error) {
        // Check if error is an AxiosError
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const responseData = error.response?.data;

            let errorMessage = "An unexpected error occurred. Please try again.";

            // Check if backend provides a structured error message
            if (responseData && responseData.success === false && responseData.message) {
                errorMessage = responseData.message;  // Use the backend's error message
            } else if (status === 404) {
                errorMessage = "User is not exist.";
            } else if (status === 500) {
                errorMessage = "Server error. Please try again later.";
            } else {
                errorMessage = error.message || errorMessage;  // Fallback to Axios' default message
            }

            // Reject the promise with a custom error message
            return Promise.reject(new Error(errorMessage));
        }

        // If the error is not an AxiosError, reject with a generic message
        return Promise.reject(new Error("An unknown error occurred."));
    }
);


export default axiosInstance;