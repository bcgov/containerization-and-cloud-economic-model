<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <h1>Submissions</h1>
      <SubmissionsTable :formName="formName" />
    </BaseSecure>
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/common/admin/SubmissionsTable.vue';
import { AppClients, FormNames } from '@/utils/constants';

export default {
  name: 'Admin',
  components: {
    SubmissionsTable
  },
  computed: {
    formName() {
      return FormNames.AGRISEAFOODOPSCREENING;
    },
    resource() {
      return AppClients.AGRISEAFOODOPSCREENING;
    }
  }
};
</script>
