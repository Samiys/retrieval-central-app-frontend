import { createStore } from 'vuex';
import { CategoryService } from "@/assets/common/category.service";
import { ProductService } from "@/assets/common/product.service";

const store = createStore({
    state: {
        categories: [],
        products: [],
        storeProducts: [],
        isLoadingProducts: false,
        error: null,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setStoreProducts(state, products) {
            state.storeProducts = products;
        },
        setError(state, error) {
            state.error = error;
        },
        removeProduct(state, productId) {
            state.products = state.products.filter(product => product.id !== productId);
        },
        setIsLoadingProducts(state, isLoading) {
            state.isLoadingProducts = isLoading;
        }
    },
    actions: {
        fetchCategories({ commit }, shopDomain) {
            CategoryService.getCategoriesWithProductCounts(shopDomain)
                .then(response => {
                    commit('setCategories', response.data);
                })
                .catch(error => {
                    commit('setError', error.message);
                });
        },
        fetchProductsByCategory({ commit }, { categoryId, shopDomain }) {
            CategoryService.getProductsByCategory(categoryId, shopDomain)
                .then(response => {
                    commit('setProducts', response.data);
                })
                .catch(error => {
                    commit('setError', error.message);
                });
        },
        fetchProductsByNullCategory({ commit }, { shopDomain }) {
            commit('setIsLoadingProducts', true);
            return ProductService.getProductsByShopWhereNullCategory(shopDomain)
                .then(response => {
                    commit('setStoreProducts', response.data);
                    commit('setIsLoadingProducts', false);
                    return response.data;
                })
                .catch(error => {
                    commit('setError', error.message);
                    commit('setIsLoadingProducts', false);
                    throw error;
                });
        },
        removeCategoryStore({ commit, dispatch }, { productId, shopDomain }) {
            commit('setIsLoadingProducts', true);
            CategoryService.removeProductCategory(productId, shopDomain)
                .then((response) => {
                    commit('setStoreProducts', response.data);
                    commit('setIsLoadingProducts', false);
                    commit('removeProduct', productId);
                    dispatch('fetchCategories', shopDomain);
                })
                .catch(error => {
                    commit('setError', error.message);
                });
        }
    },
    getters: {
        isLoadingProducts: state => state.isLoadingProducts,
        categories: state => state.categories,
        products: state => state.products,
        storeProducts: state => state.storeProducts,
        error: state => state.error,
    }
});

export default store;
