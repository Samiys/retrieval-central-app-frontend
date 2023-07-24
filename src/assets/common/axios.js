import axios from "axios";
import { AuthService } from "./auth.service";

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        AuthService.removeToken();
        return Promise.reject(error);
    }
);

export default axiosInstance;
