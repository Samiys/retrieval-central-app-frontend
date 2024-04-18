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
          Fetch Store Products
        </h3>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div class="block w-full overflow-x-auto" style="height: 100%">
      <div class="flex ml-45">
        <div class="preview-box">
          <div class="preview-header">Stores</div>
          <div class="preview-list">
            <ul class="list-group">
              <li class="list-group-item cursor-pointer" v-for="item in allStores" :key="item.id"
                  @click="selectDistributorItem(item)" :class="{ 'selected': item.shop_domain === selectedStore }">
                <span>{{ item.shop_domain }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-success mt-4 mb-4 ml-45" @click="fetchProducts()"
              :disabled="!selectedStore">
        Fetch Products
      </button>
    </div>
  </div>
</template>
<script>

import { StoreService } from "../../assets/common/store.service";
import { ProductService } from "../../assets/common/product.service";

export default {
  data() {
    return {
      error: null,
      collapsedItems: [],
      allStores: [],
      selectedStore: null,
      selectedMerchantProductId: null,
    };
  },
  components: {

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
    this.loadStoreData();
  },
  methods: {
    loadStoreData() {
      StoreService.getStoresInfo()
          .then(response => {
            this.allStores = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    fetchProducts() {
      ProductService.fetchProducts(this.selectedStore);
    },
    selectDistributorItem(item) {
      this.selectedStore = item.shop_domain;
    }
  }
};
</script>

<style>
.preview-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 600px;
  width: 500px;
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

.list-group-item a {
  color: #333;
  text-decoration: none;
}

.list-group-item a:hover {
  color: #007bff;
}

.selected {
  background-color: #13b981 !important;
  color: #ffffff !important;
}

.ml-45 {
  margin-left: 45px;
}
</style>