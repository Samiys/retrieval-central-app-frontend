import axios from 'axios';
const API_URL = 'http://localhost:3031/shopify';

export const BrickMortarService = {
    getBrickMortarOrders() {
        return axios.get(`${API_URL}/getBrickMortarOrders`);
    },
}