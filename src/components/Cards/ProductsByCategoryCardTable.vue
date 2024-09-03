<template>
  <div v-if="products.length > 0">
    <div class="rounded-t mb-0 mt-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h3
              class="font-semibold text-lg"
              :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Connected Products
          </h3>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            #
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Title
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Category
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Image
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in products" :key="item.id">
          <th
              class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left flex items-center"
          >
              <span
                  style="padding-top: 15px;"
                  class="ml-3 font-bold"
                  :class="[
                  color === 'light' ? 'text-blueGray-600' : 'text-white',
                ]"
              >
                {{ index + 1 }}
              </span>
          </th>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap"
          >
            {{ item.title }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap"
          >
            {{ item.category.name }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap"
          >
            <a :href="item.image_url" target="_blank">
              <img
                  style="margin: 0 auto;"
                  :src="item.image_url"
                  class="h-12 w-12"
                  alt="..."
              />
            </a>
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap"
          >
            <a href="javascript:void(0);" @click="removeCategory(item.id)">Remove Category</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "ProductsByCategoryCardTable",
  props: {
    shopDomain: String,
    categorySelectedId: {
      type: Number,
      required: false
    },
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    ...mapState(['products', 'error']),

  },
  watch: {
    categorySelectedId(newCategoryId) {
      if (newCategoryId) {
        this.fetchProductsByCategory({categoryId: newCategoryId, shopDomain: this.shopDomain});
      }
    }
  },
  methods: {
    ...mapActions(['fetchProductsByCategory', 'removeCategoryStore']),
    removeCategory(id) {
      this.removeCategoryStore({ productId: id, shopDomain: this.shopDomain });
    }
  }
};
</script>
