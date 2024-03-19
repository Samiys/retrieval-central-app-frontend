import axios from './axios';
const prefix = '/shopify';

export const StoreService = {
    getStoresInfo() {
        return axios.get(`${prefix}/getStoresInfo`);
    },
    getDistributorStoresInfo() {
        return axios.get(`${prefix}/getDistributorStoresInfo`);
    },
    getMerchantStoresInfo() {
        return axios.get(`${prefix}/getMerchantStoresInfo`);
    },
}