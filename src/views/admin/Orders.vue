<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <orders-card-table />
    </div>
  </div>
</template>
<script>
import OrdersCardTable from "@/components/Cards/OrdersCardTable.vue";

export default {
  components: {
    OrdersCardTable,
  },
};
</script>
