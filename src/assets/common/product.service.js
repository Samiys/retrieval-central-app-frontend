import axios from './axios';
const prefix = '/shopify';

export const ProductService = {
    getProducts() {
        return axios.get(`${prefix}/getProducts`);
    },
    getProductsByStore(shop_domain) {
        return axios.get(`${prefix}/getProductsByStore`, {
            params: {
                shop_domain: shop_domain
            }
        });
    },
}