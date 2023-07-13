<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <products-card-table />
    </div>
  </div>
</template>
<script>
import ProductsCardTable from "@/components/Cards/ProductsCardTable.vue";

export default {
  components: {
    ProductsCardTable,
  },
};
</script>
