<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <brick-mortar-order-card-table />
    </div>
  </div>
</template>
<script>
import BrickMortarOrderCardTable from "@/components/Cards/BrickMortarOrderCardTable.vue";

export default {
  components: {
    BrickMortarOrderCardTable
  },
};
</script>
