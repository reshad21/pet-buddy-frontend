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
const errorMessages: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized access. Please log in.",
    403: "Forbidden. You don't have permission to access this resource.",
    404: "Not found. The requested resource does not exist.",
    408: "Request timed out. Please try again.",
    500: "Internal server error. Please try again later.",
    502: "Bad gateway. The server is down.",
    503: "Service unavailable. Please try again later.",
    504: "Gateway timeout. The server took too long to respond.",
};

axiosInstance.interceptors.response.use(
    function (response) {
        return response;  // Return the response if successful
    },
    function (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const responseData = error.response?.data;

            let errorMessage = "An unexpected error occurred. Please try again.";

            if (responseData && responseData.success === false && responseData.message) {
                errorMessage = responseData.message;  // Use backend's error message if available
            } else if (status && errorMessages[status]) {
                errorMessage = errorMessages[status];  // Use predefined error message for common status codes
            } else {
                errorMessage = error.message || errorMessage;  // Fallback to Axios' default message
            }

            return Promise.reject(new Error(errorMessage)); // Reject with the custom error message
        }

        return Promise.reject(new Error("An unknown error occurred.")); // Handle non-Axios errors
    }
);


export default axiosInstance;