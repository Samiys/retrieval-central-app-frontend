<template>
  <div class="category-select-container w-1/2">
    <h3 class="font-semibold text-lg text-blueGray-700">Select a category</h3>
    <select
        id="category-select"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        v-model="selectedCategory"
        @change="handleCategoryChange"
    >
      <option value="Select a category" disabled>Select a category</option>
      <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
      >
        {{ category.name }} ({{ category.productCount }} products)
      </option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "CategorySelect",
  data() {
    return {
      selectedCategory: null
    };
  },
  props: {
    shopDomain: String
  },
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    ...mapActions(['fetchCategories']),
    handleCategoryChange() {
      this.$emit('category-selected', this.selectedCategory);
    }
  },
  created() {
    this.fetchCategories(this.shopDomain);
  }
};
</script>

<style>
.category-select-container {
  margin: 0 20px 0 20px;
}
</style>
