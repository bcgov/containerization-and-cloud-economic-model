<template>
  <v-container>
    <h1>Submissions</h1>
    <SubmissionsTable :formName="formName" />
  </v-container>
</template>

<script>
import SubmissionsTable from '@/components/common/admin/SubmissionsTable.vue';
import { FormNames } from '@/utils/constants';

export default {
  name: 'CloudEconomicModelAdmin',
  components: {
    SubmissionsTable
  },
  computed: {
    formName() {
      return FormNames.CLOUDECONOMICMODEL;
    }
  }
};
</script>
