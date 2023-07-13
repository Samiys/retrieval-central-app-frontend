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
            Orders
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
            <!-- <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Order Id
            </th> -->
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Order #
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Order Date
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Total
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Tax
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Discount
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Status url
            </th>
          </tr>
        </thead>
        <tbody>
          <div v-if="apiData">
    </div>
          <tr v-for="(item, index) in apiData" :key="item.id">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
            >
              {{ index + 1 }}
            </th>
            <!-- <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.order_id }}
            </td> -->
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.order_number }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ new Date(item.order_date).toLocaleString() }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.total_price }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.total_tax }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ item.total_discounts }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <a style="color: blue;text-decoration: underline;" :href=item.order_status_url target="_blank">
                <span>order status</span>
              </a>
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
import { OrderService } from "../../assets/common/order.service";

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
    this.loadOrdersData();
  },
  methods: {
    loadOrdersData() {
      OrderService.getOrders()
          .then(response => {
            this.apiData = response.data;
          })
          .catch(error => {
            this.error = error.message;
          });
      }
  }
};
</script>