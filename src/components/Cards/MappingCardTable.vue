<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded h-600-px"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Mappings
          </h3>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div class="block w-full overflow-x-auto" style="height: 100%">
      <!-- Projects table -->
<!--      <div v-for="(item, index) in distributorStores" :key="item.id">-->
<!--        <div class="card">-->
<!--          <div class="card-header" @click="toggleCollapse(index)">-->
<!--            <h2>{{ item.shop_domain }}</h2>-->
<!--            <span v-if="!collapsedItems.includes(index)">-</span>-->
<!--            <span v-else>+</span>-->
<!--          </div>-->
<!--          <div v-show="!collapsedItems.includes(index)" class="card-content">-->
<!--            {{ item.content }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="flex ml-45">
        <div class="preview-box">
          <div class="preview-header">Distributor Stores</div>
          <div class="preview-list">
            <ul class="list-group">
              <li class="list-group-item" v-for="item in distributorStores" :key="item.id">
                <a href="#" @click="selectDistributorItem(item)">{{ item.shop_domain }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Distributor Product</div>
          <div class="preview-list">
            <ul class="list-group">
              <li v-if="distributorProducts.length <= 0">Select distributor store to display products</li>
              <li class="list-group-item" v-for="item in distributorProducts" :key="item.id">
                <a href="#" @click="selectDistributorProduct(item)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Merchant Store</div>
          <div class="preview-list">
            <ul class="list-group">
              <li class="list-group-item" v-for="item in merchantStores" :key="item.id">
                <a href="#" @click="selectMerchantItem(item)">{{ item.shop_domain }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Merchant Product</div>
          <div class="preview-list">
            <ul class="list-group">
              <li v-if="merchantProducts.length <= 0">Select merchant store to display products</li>
              <li class="list-group-item" v-for="item in merchantProducts" :key="item.id">
                <a href="#" @click="selectMerchantProduct(item)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
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
      distributorStores: [],
      merchantStores: [],
      distributorProducts: [],
      merchantProducts: [],
      selectedDistributorStore: null,
      selectedMerchantStore: null,
      selectedDistributorProduct: null,
      selectedMerchantProduct: null,
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
      StoreService.getDistributorStoresInfo()
          .then(response => {
            this.distributorStores = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });

      StoreService.getMerchantStoresInfo()
          .then(response => {
            this.merchantStores = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
      },
    selectDistributorProduct(item) {
      this.selectedDistributorProduct = item.id;
    },
    selectMerchantProduct(item) {
      this.selectedMerchantProduct = item.id;
    },
    selectDistributorItem(item) {
      this.selectedDistributorStore = item.shop_domain;
      ProductService.getProductsByStore(item.shop_domain)
          .then(response => {
            this.distributorProducts = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    selectMerchantItem(item) {
      this.selectedMerchantStore = item.shop_domain;
      ProductService.getProductsByStore(item.shop_domain)
          .then(response => {
            this.merchantProducts = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    toggleCollapse(index) {
      if (this.collapsedItems.includes(index)) {
        this.collapsedItems = this.collapsedItems.filter(item => item !== index);
      } else {
        this.collapsedItems.push(index);
      }
    }
  }
};
</script>

<style>
.preview-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  max-height: 300px;
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

.list-group-item a {
  color: #333;
  text-decoration: none;
}

.list-group-item a:hover {
  color: #007bff;
}

.ml-45 {
  margin-left: 45px;
}
</style>