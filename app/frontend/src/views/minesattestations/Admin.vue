<template>
  <v-container>
    <BaseSecure>
      <h1>Submissions</h1>
      <SubmissionsTable />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/minesattestations/admin/SubmissionsTable.vue';

export default {
  name: 'MinesAttestationsAdmin',
  components: {
    SubmissionsTable
  }
};
</script>
