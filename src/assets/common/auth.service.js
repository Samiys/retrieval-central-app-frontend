import axios from 'axios';
const API_URL = process.env.VUE_APP_BACKEND_URL;

export const AuthService = {
    login(email, password) {
        console.log(`${API_URL}/login`);
        return axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        });
    },
    setToken(token) {
        return localStorage.setItem('token', token);
    },
    removeToken() {
        return localStorage.removeItem('token');
    }
}