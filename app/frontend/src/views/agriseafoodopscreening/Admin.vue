<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <h1>Submissions</h1>
      <SubmissionsTable />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/agriseafoodopscreening/admin/SubmissionsTable.vue';
import { AppClients } from '@/utils/constants';

export default {
  name: 'Admin',
  components: {
    SubmissionsTable
  },
  computed: {
    resource() {
      return AppClients.AGRISEAFOODOPSCREENING;
    }
  }
};
</script>
