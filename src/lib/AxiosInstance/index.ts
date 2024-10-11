
import envConfig from "@/config/envConfig";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: envConfig.baseApi,
    headers: {
        'Content-Type': 'application/json', // Ensure correct content type
    },
});

export default axiosInstance;