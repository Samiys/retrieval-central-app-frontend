<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <category-card-table v-if="isCategoryRoute" />
      <connect-product-category-card v-if="isConnectProductCategory" />
      <add-edit-category-card
          v-if="isAddNewCategoryRoute || isEditCategoryRoute"
          :category-name="currentCategoryName"
      />
    </div>
  </div>
</template>

<script>
import CategoryCardTable from "@/components/Cards/CategoryCardTable.vue";
import AddEditCategoryCard from "@/components/Cards/AddEditCategoryCard.vue";
import ConnectProductCategoryCard from "@/components/Cards/ConnectProductCategoryCard.vue";

export default {
  components: {
    CategoryCardTable,
    AddEditCategoryCard,
    ConnectProductCategoryCard,
  },
  computed: {
    isCategoryRoute() {
      return this.$route.path === '/admin/category';
    },
    isAddNewCategoryRoute() {
      return this.$route.path === '/admin/add-category';
    },
    isEditCategoryRoute() {
      return this.$route.path.startsWith('/admin/edit-category/') && !!this.$route.params.name;
    },
    isConnectProductCategory() {
      return this.$route.path === '/admin/connect-product-category';
    },
    currentCategoryName() {
      return this.isEditCategoryRoute ? this.$route.params.name : null;
    },
  }
};
</script>
