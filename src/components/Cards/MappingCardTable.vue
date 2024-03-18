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
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
<!--      <div v-for="(item, index) in apiData" :key="item.id">-->
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

      <div v-for="(item, index) in apiData" :key="item.id">
        <div class="border border-gray-300 rounded-md mb-4">
          <div class="flex items-center justify-between px-4 py-2 cursor-pointer bg-gray-100"
               @click="toggleCollapse(index)">
            <h2 class="font-semibold">{{ item.shop_domain }}</h2>
            <span v-if="!collapsedItems.includes(index)" class="text-sm">-</span>
            <span v-else class="text-sm">+</span>
          </div>
          <div v-show="!collapsedItems.includes(index)" class="px-4 py-2 bg-white">
            <p class="text-gray-700">{{ item.shop_domain }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { StoreService } from "../../assets/common/store.service";

export default {
  data() {
    return {
      apiData: null,
      error: null,
      collapsedItems: []
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
            this.apiData = response.data;
            console.log(response.data.length);
            this.collapsedItems = Array(this.apiData.length).fill(true);
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
.card {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.card-header {
  background-color: #f0f0f0;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.card-content {
  padding: 10px;
}
</style>