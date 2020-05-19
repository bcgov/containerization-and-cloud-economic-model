<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <Dashboard :url="dashboardUrl" />
    </BaseSecure>
  </v-container>
</template>

<script>
import Dashboard from '@/components/common/Dashboard.vue';
import { AppClients } from '@/utils/constants';

export default {
  name: 'PublicDashboard',
  components: {
    Dashboard
  },
  computed: {
    dashboardUrl() {
      return this.$config
        ? this.$config.dashboards.minesattestations.publicUrl
        : undefined;
    },
    resource() {
      return AppClients.MINESATTESTATIONS;
    }
  }
};
</script>
