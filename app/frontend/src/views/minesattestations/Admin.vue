<template>
  <div>
    <AdminNavBar />
    <v-container>
      <BaseSecure>
        <h1>Submissions</h1>
        <SubmissionsTable />
      </BaseSecure>
    </v-container>
  </div>
</template>

<script>
import AdminNavBar from '@/components/minesattestations/admin/AdminNavBar.vue';
import SubmissionsTable from '@/components/minesattestations/admin/SubmissionsTable.vue';

export default {
  name: 'MinesAttestationsAdmin',
  components: {
    AdminNavBar,
    SubmissionsTable
  }
};
</script>
