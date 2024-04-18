<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <fetch-products-card-table/>
    </div>
  </div>
</template>
<script>
import FetchProductsCardTable from "@/components/Cards/FetchProductsCardTable.vue";

export default {
  components: {
    FetchProductsCardTable
  },
};
</script>
