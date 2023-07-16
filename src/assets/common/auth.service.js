import axios from 'axios';
const API_URL = 'http://localhost:3031';

export const AuthService = {
    login(email, password) {
        console.log(email, password);
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