import axios from './axios';
const prefix = '/shopify';

export const BrickMortarService = {
    getBrickMortarOrders() {
        return axios.get(`${prefix}/getBrickMortarOrders`);
    },
}