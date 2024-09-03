import axios from './axios';

export const CategoryService = {
    getCategories() {
        return axios.get(`/getCategories`);
    },
    getProductsByCategory(category_id, shop_domain) {
        return axios.get(`/getProductsByCategory`, {
            params: {
                category_id,
                shop_domain
            }
        });
    },
    removeProductCategory(product_id, shop_domain) {
        return axios.get(`/removeProductCategory`, {
            params: {
                product_id,
                shop_domain
            }
        });
    },
    getCategoriesWithProductCounts(shop_domain) {
        return axios.get("/getCategoriesWithProductCounts", {
            params: {
                shop_domain
            }
        });
    },
    addCategory(name) {
        return axios.post(`/addCategory`, { name });
    },
    updateCategory(category_name, updateData) {
        return axios.put(`/updateCategory/${category_name}`, updateData);
    },
    deleteCategory(category_id) {
        return axios.delete(`/deleteCategory/${category_id}`);
    },
    addCategoryToProducts(product_ids, category_id, shop_domain) {
        return axios.post(`/addCategoryToProducts`, { product_ids, category_id, shop_domain});
    },
};
