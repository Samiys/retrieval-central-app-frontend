import axios from './axios';
const prefix = '/shopify';

export const ProductService = {
    getProducts() {
        return axios.get(`${prefix}/getProducts`);
    },
    fetchProducts(selectedStore) {
        return axios.get(`${prefix}/fetchProducts`, {
            params: {
                shop_domain: selectedStore
            }
        });
    },
    getProductsByStore(shop_domain) {
        return axios.get(`${prefix}/getProductsByStore`, {
            params: {
                shop_domain: shop_domain
            }
        });
    },
}