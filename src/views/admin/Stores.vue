<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <stores-card-table />
    </div>
  </div>
</template>
<script>
import StoresCardTable from "@/components/Cards/StoresCardTable.vue";

export default {
  components: {
    StoresCardTable,
  },
};
</script>
