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
          Category
        </h3>
        <div class="flex space-x-2">
          <button
              type="button"
              class="btn btn-warning mr-4"
              @click="navigateToConnectProductCategory"
          >
            Connect Products
          </button>
          <button
              type="button"
              class="btn btn-warning ml-auto"
              @click="navigateToAddCategory"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
    <div v-if="error" class="text-red-500 px-4 py-2">{{ error }}</div>
    <div class="block w-full overflow-x-auto">
      <!-- Categories table -->
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
            Name
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
        <tr v-if="apiData && apiData.length === 0">
          <td colspan="3" class="text-center p-4">No categories found</td>
        </tr>
        <tr v-for="(item, index) in apiData" :key="item.id">
          <th
              class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
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
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ item.name }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            <a :href="`/admin/edit-category/${item.name}`">Edit</a> |
            <a href="#" @click="deleteCategory(item.id)">Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bootstrap from "@/assets/img/bootstrap.jpg";
import angular from "@/assets/img/angular.jpg";
import sketch from "@/assets/img/sketch.jpg";
import react from "@/assets/img/react.jpg";
import vue from "@/assets/img/react.jpg";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import team4 from "@/assets/img/team-4-470x470.png";
import { CategoryService } from "@/assets/common/category.service";

export default {
  data() {
    return {
      apiData: null,
      error: null,
      bootstrap,
      angular,
      sketch,
      react,
      vue,
      team1,
      team2,
      team3,
      team4,
    };
  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      CategoryService.getCategories()
          .then((response) => {
            this.apiData = response.data;
          })
          .catch((error) => {
            this.error = error.message;
          });
    },
    navigateToAddCategory() {
      this.$router.push("/admin/add-category");
    },
    navigateToConnectProductCategory() {
      this.$router.push("/admin/connect-product-category");
    },
    deleteCategory(categoryId) {
      if (confirm("Are you sure you want to delete this category?")) {
        CategoryService.deleteCategory(categoryId)
            .then(() => {
              this.loadCategories();
            })
            .catch((error) => {
              this.error = error.message;
            });
      }
    },
  },
};
</script>

<style>
.add-category {
  margin: 0 25px 50px 25px;
}
</style>
