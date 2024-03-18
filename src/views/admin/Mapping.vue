<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <mapping-card-table />
    </div>
  </div>
</template>
<script>
import MappingCardTable from "@/components/Cards/MappingCardTable.vue";

export default {
  components: {
    MappingCardTable,
  },
};
</script>
