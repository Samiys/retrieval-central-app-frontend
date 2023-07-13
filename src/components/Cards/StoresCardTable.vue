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
            Stores
          </h3>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
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
              Shop
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Type
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          <div v-if="apiData">
    </div>
          <tr v-for="(item, index) in apiData" :key="item.id">
            <th
              class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
            >
              <span
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
              {{ item.shop_domain }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.store_type }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <span v-if="item.street">{{ item.street }}, {{ item.city }}, {{ item.state }}, {{ item.zipcode }}</span>
              <span v-else>Not Applicable</span>
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
import { StoreService } from "../../assets/common/store.service";

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
          })
          .catch(error => {
            this.error = error.message;
          });
      }
  }
};
</script>