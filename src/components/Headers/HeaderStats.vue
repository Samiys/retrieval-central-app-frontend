<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="USERS"
              :statTitle="users"
              statIconName="fas fa-users"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="STORES"
              :statTitle="stores"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PRODUCTS"
              :statTitle="products"
              statIconName="far fa-chart-bar"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="ORDERS"
              :statTitle="orders"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import { UserService } from "../../assets/common/user.service";
import { StoreService } from "../../assets/common/store.service";
import { ProductService } from "../../assets/common/product.service";
import { OrderService } from "../../assets/common/order.service";
import { BrickMortarService } from "../../assets/common/brick-mortar.service";

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      users: null,
      stores: null,
      products: null,
      orders: null,
      error: null
    };
  },
  mounted() {
    this.loadUserData();
    this.loadStoreData();
    this.loadProductsData();
    this.loadOrdersData();
    this.loadBrickMortarOrdersData();
  },
  methods: {
    loadUserData() {
      UserService.getUsers()
          .then(response => {
            this.users = String(response.data.length);
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    loadStoreData() {
      StoreService.getStoresInfo()
          .then(response => {
            this.stores = String(response.data.length);
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    loadProductsData() {
      ProductService.getProducts()
          .then(response => {
            this.products = String(response.data.length);
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    loadOrdersData() {
      OrderService.getOrders()
          .then(response => {
            this.orders = String(response.data.length);
          })
          .catch(error => {
            this.error = error.message;
          });
    },
    loadBrickMortarOrdersData() {
      BrickMortarService.getBrickMortarOrders()
          .then(response => {
            this.apiData = String(response.data);
          })
          .catch(error => {
            this.error = error.message;
          });
    }
  }
};
</script>
