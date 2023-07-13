<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <users-card-table />
    </div>
  </div>
</template>
<script>
import UsersCardTable from "@/components/Cards/UsersCardTable.vue";

export default {
  components: {
    UsersCardTable,
  },
};
</script>
