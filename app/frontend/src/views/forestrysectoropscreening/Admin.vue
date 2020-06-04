<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <h1>Submissions</h1>
      <SubmissionsTable />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/forestrysectoropscreening/admin/SubmissionsTable.vue';
import { AppClients } from '@/utils/constants';

export default {
  name: 'Admin',
  components: {
    SubmissionsTable
  },
  computed: {
    resource() {
      return AppClients.FORESTRYSECTOROPSCREENING;
    }
  }
};
</script>
