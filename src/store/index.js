import { createStore } from 'vuex';
import { CategoryService } from "@/assets/common/category.service";

const store = createStore({
    state: {
        categories: [],
        products: [],
        error: null,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setError(state, error) {
            state.error = error;
        },
        removeProduct(state, productId) {
            state.products = state.products.filter(product => product.id !== productId);
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
        removeCategoryStore({ commit, dispatch }, { productId, shopDomain }) {
            CategoryService.removeProductCategory(productId, shopDomain)
                .then(() => {
                    commit('removeProduct', productId);
                    dispatch('fetchCategories', shopDomain);
                })
                .catch(error => {
                    commit('setError', error.message);
                });
        }
    },
    getters: {
        categories: state => state.categories,
        products: state => state.products,
        error: state => state.error,
    }
});

export default store;
