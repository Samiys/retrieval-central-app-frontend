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

    <!-- Display error or success messages -->
    <div v-if="error" class="text-red-500 px-4 py-2">{{ error }}</div>
    <div v-if="successMessage" class="text-green-500 px-4 py-2">{{ successMessage }}</div>

    <div class="block w-full overflow-x-auto accordion-container">
      <div class="accordion">
        <div class="card" v-for="item in storeData" :key="item.id">
          <div class="card-header" :id="'heading' + item.id">
            <h5 class="mb-0">
              <button
                  class="btn btn-link"
                  data-toggle="collapse"
                  :data-target="'#collapse' + item.id"
                  aria-expanded="false"
                  :aria-controls="'collapse' + item.id"
                  @click="getStoreProducts(item.shop_domain)"
              >
                {{ item.shop_domain }}
              </button>
            </h5>
          </div>
          <div
              :id="'collapse' + item.id"
              class="collapse"
              :aria-labelledby="'heading' + item.id"
              data-parent="#accordion"
          >
            <div class="card-body">
              <div class="flex ml-20">
                <div class="preview-box ml-3">
                  <div class="preview-header">Select Products</div>
                  <div class="preview-list">
                    <ul class="list-group">
                      <li v-if="isLoadingProducts">Loading distributor products...</li>
                      <li
                          class="list-group-item cursor-pointer"
                          v-for="item in storeProducts"
                          :key="item.id"
                          @click="toggleProductSelection(item.product_id)"
                          :class="{ 'selected': selectedProductIds.includes(item.product_id) }"
                      >
                        <span>{{ item.title }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="preview-box ml-3">
                  <div class="preview-header">Select Category</div>
                  <div class="preview-list">
                    <ul class="list-group">
                      <li
                          class="list-group-item cursor-pointer"
                          v-for="item in categories"
                          :key="item.id"
                          @click="selectCategoryItem(item)"
                          :class="{ 'selected': item.id === selectedCategoryId }"
                      >
                        <span>{{ item.name }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                    type="button"
                    class="btn btn-success"
                    @click="saveMapping()"
                    :disabled="!selectedCategoryId || selectedProductIds.length === 0"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StoreService } from "@/assets/common/store.service";
import { ProductService } from "@/assets/common/product.service";
import { CategoryService } from "@/assets/common/category.service";

export default {
  data() {
    return {
      error: null,
      successMessage: '',  // Add success message data property
      storeData: null,
      storeProducts: [],
      categories: [],
      selectedCategoryId: null,
      selectedProductIds: [],
      isLoadingProducts: false,
    };
  },
  mounted() {
    this.loadStoreData();
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
    navigateToCategories() {
      this.$router.push("/admin/category");
    },
    getStoreProducts(shop_domain) {
      this.isLoadingProducts = true;
      ProductService.getAllProductsByShopDomain(shop_domain)
          .then(response => {
            this.isLoadingProducts = false;
            this.storeProducts = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    toggleProductSelection(product_id) {
      const index = this.selectedProductIds.indexOf(product_id);
      if (index > -1) {
        this.selectedProductIds.splice(index, 1);
      } else {
        this.selectedProductIds.push(product_id);
      }
    },
    saveMapping() {
      if (this.selectedProductIds.length === 0) {
        this.error = "Please select at least one product.";
        return;
      }

      const mappings = {
        product_ids: this.selectedProductIds,
        category_id: this.selectedCategoryId
      };

      CategoryService.addCategoryToProducts(mappings.product_ids, mappings.category_id)
          .then(() => {
            this.successMessage = 'Products successfully assigned to category!';
            this.selectedProductIds = [];
            this.selectedCategoryId = null;
            setTimeout(() => {
              this.successMessage = '';  // Clear success message after 3 seconds
            }, 3000);
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    loadStoreData() {
      StoreService.getStoresInfo()
          .then(response => {
            this.storeData = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });

      CategoryService.getCategories()
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    selectCategoryItem(item) {
      this.selectedCategoryId = item.id;
    },
  }
};
</script>

<style>
.accordion {
  margin: 0 25px 0 20px;
}

.card {
  margin-bottom: 10px;
}

.preview-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 400px;
  width: 325px;
}

.preview-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.preview-list {
  max-height: calc(100% - 40px);
  overflow-y: auto;
}

.list-group {
  font-size: 14px;
  margin-bottom: 0;
}

.list-group-item {
  border: none;
  padding: 5px;
}

.selected {
  background-color: #13b981 !important;
  color: #ffffff !important;
}

.ml-20 {
  margin-left: 20px;
}
</style>
