import axios from './axios';
const prefix = '/shopify';

export const ProductService = {
    getProducts() {
        return axios.get(`${prefix}/getProducts`);
    },
}