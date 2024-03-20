<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
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
      <div class="flex ml-45">
        <div class="preview-box">
          <div class="preview-header">Distributor Stores</div>
          <div class="preview-list">
            <ul class="list-group">
              <li class="list-group-item cursor-pointer" v-for="item in distributorStores" :key="item.id"
                  @click="selectDistributorItem(item)" :class="{ 'selected': item.id === selectedDistributorStoreId }">
                <span>{{ item.shop_domain }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Distributor Product</div>
          <div class="preview-list">
            <ul class="list-group">
              <li v-if="distributorProducts.length <= 0">Select distributor store to display products</li>
              <li class="list-group-item cursor-pointer" v-for="item in distributorProducts" :key="item.id"
                  @click="selectDistributorProduct(item.product_id)" :class="{ 'selected': item.product_id === selectedDistributorProductId }">
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Merchant Store</div>
          <div class="preview-list">
            <ul class="list-group">
              <li class="list-group-item cursor-pointer" v-for="item in merchantStores" :key="item.id"
                  @click="selectMerchantItem(item)" :class="{ 'selected': item.id === selectedMerchantStoreId }">
                <span>{{ item.shop_domain }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="preview-box ml-3">
          <div class="preview-header">Select Merchant Product</div>
          <div class="preview-list">
            <ul class="list-group">
              <li v-if="merchantProducts.length <= 0">Select merchant store to display products</li>
              <li class="list-group-item cursor-pointer" v-for="item in merchantProducts" :key="item.id"
                  @click="selectMerchantProduct(item.product_id)" :class="{ 'selected': item.product_id === selectedMerchantProductId }">
                <span>{{ item.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <button type="button" class="btn btn-success" @click="saveMapping()"
                :disabled="!selectedMerchantProductId || !selectedMerchantStoreId || !selectedDistributorStoreId || !selectedDistributorProductId">
          Save
        </button>
      </div>

      <h5 class="ml-45" style="margin-top: 3%;margin-bottom: 1%">All Mappings</h5>
      <table class="items-center w-full bg-transparent border-collapse mt-3 ml-45" style="width: 93%;margin-bottom: 3%;">
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
            Distributor Store
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Distributor Product
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Retailer Store
          </th>
          <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
          >
            Retailer Product
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
        <div v-if="existedMapping">
        </div>
        <tr v-for="(item, index) in existedMapping" :key="item.id">
          <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
          >
            {{ index + 1 }}
          </th>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ item.distributor.shop_domain }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ item.distributorProduct.title }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ item.retailer.shop_domain }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
            {{ item.retailerProduct.title }}
          </td>
          <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
          >
          <span class="cursor-pointer" @click="deleteMapping(item.id)">
            <i class="fas fa-trash" style="margin-left: 5px;"></i>
          </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

import { StoreService } from "../../assets/common/store.service";
import { ProductService } from "../../assets/common/product.service";
import { MappingService } from "../../assets/common/mapping.service";

export default {
  data() {
    return {
      error: null,
      collapsedItems: [],
      distributorStores: [],
      merchantStores: [],
      distributorProducts: [],
      merchantProducts: [],
      existedMapping: [],
      selectedDistributorStoreId: null,
      selectedMerchantStoreId: null,
      selectedDistributorProductId: null,
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

      MappingService.getMappings()
          .then(response => {
            this.existedMapping = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
      },
    saveMapping() {
      const mappingData = {
        'distributorId': this.selectedDistributorStoreId,
        'distributorProductId': this.selectedDistributorProductId,
        'retailerId': this.selectedMerchantStoreId,
        'retailerProductId': this.selectedMerchantProductId
      };
      MappingService.saveMappings(mappingData).then(response => {
        this.existedMapping.push(response.data);
        }).catch(error => {
          this.error = error.message;
        });
    },
    deleteMapping(id) {
      MappingService.deleteMapping(id).then(() => {
        const index = this.existedMapping.findIndex(mapping => mapping.id === id);
        if (index !== -1) {
          this.existedMapping.splice(index, 1);
        }
      }).catch(error => {
        this.error = error.message;
      });
    },
    selectDistributorProduct(product_id) {
      this.selectedDistributorProductId = product_id;
    },
    selectMerchantProduct(product_id) {
      this.selectedMerchantProductId = product_id;
    },
    selectDistributorItem(item) {
      this.selectedDistributorStoreId = item.id;
      ProductService.getProductsByStore(item.shop_domain)
          .then(response => {
            this.distributorProducts = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    selectMerchantItem(item) {
      this.selectedMerchantStoreId = item.id;
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