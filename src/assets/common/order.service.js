import axios from './axios';
const prefix = '/shopify';

export const OrderService = {
    getOrders() {
        return axios.get(`${prefix}/getOrders`);
    },
}