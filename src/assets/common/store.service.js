import axios from './axios';
const prefix = '/shopify';

export const StoreService = {
    getStoresInfo() {
        return axios.get(`${prefix}/getStoresInfo`);
    },
}