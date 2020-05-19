<template>
  <v-container>
    <BaseSecure editor :resource="resource">
      <Dashboard :url="dashboardUrl" />
    </BaseSecure>
  </v-container>
</template>

<script>
import Dashboard from '@/components/common/Dashboard.vue';
import { AppClients } from '@/utils/constants';

export default {
  name: 'InspectionDashboard',
  components: {
    Dashboard
  },
  computed: {
    dashboardUrl() {
      return this.$config ? this.$config.dashboards.inspectionUrl : undefined;
    },
    resource() {
      return AppClients.MINESATTESTATIONS;
    }
  }
};
</script>
