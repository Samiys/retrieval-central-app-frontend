<template>
  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex justify-between items-center">
        <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
        >
          Connect Product Category
        </h3>
        <button
            type="button"
            class="btn btn-warning"
            @click="navigateToCategories"
        >
          Back to Categories
        </button>
      </div>
    </div>
    <div v-if="error" class="text-red-500 px-4 py-2">{{ error }}</div>
    <div class="block w-full overflow-x-auto">
      <div class="add-category">
        <h6>Category Name</h6>
        <input v-model="categoryName" class="form-control w-auto" />
        <button
            type="button"
            @click="isEditMode ? updateCategory() : addNewCategory()"
            class="btn btn-sm btn-primary mt-4"
        >
          {{ isEditMode ? "Update" : "Add" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { CategoryService } from "@/assets/common/category.service";

export default {
  data() {
    return {
      error: null,
      categoryName: "",
      isEditMode: false,
    };
  },
  mounted() {
    this.checkRouteForEdit();
  },
  props: {
    color: {
      default: "light",
      validator(value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    checkRouteForEdit() {
      const categoryNameFromRoute = this.$route.params.name;
      if (categoryNameFromRoute) {
        this.isEditMode = true;
        this.categoryName = categoryNameFromRoute;
      }
    },
    navigateToCategories() {
      this.$router.push("/admin/category");
    },
    addNewCategory() {
      if (!this.categoryName.trim()) {
        this.error = "Category name is required.";
        return;
      }
      CategoryService.addCategory(this.categoryName)
          .then((response) => {
            console.log({response});
            this.navigateToCategories();
          })
          .catch((error) => {
            this.error = error.message;
          });
    },
    updateCategory() {
      if (!this.categoryName.trim()) {
        this.error = "Category name is required.";
        return;
      }
      CategoryService.updateCategory(this.$route.params.name, {name: this.categoryName})
          .then(() => {
            this.navigateToCategories();
          })
          .catch((error) => {
            this.error = error.message;
          });
    },
  },
};
</script>

<style>
.add-category {
  margin: 0 25px 50px 25px;
}
</style>
