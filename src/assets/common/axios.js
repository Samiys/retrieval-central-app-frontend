import axios from "axios";
import { AuthService } from "./auth.service";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3031",
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
