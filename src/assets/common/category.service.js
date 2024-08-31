import axios from './axios';

export const CategoryService = {
    getCategories() {
        return axios.get(`/getCategories`);
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

    addCategoryToProduct(product_id, category_id) {
        return axios.post(`/addCategoryToProduct`, { product_id, category_id });
    },
};
