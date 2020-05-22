<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
      <div v-else>
        <v-tabs v-model="tab">
          <v-tab v-for="dashboard in dashboards" :key="dashboard.name">{{ dashboard.name }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="dashboard in dashboards" :key="dashboard.name">
            <Dashboard :url="dashboard.url" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </BaseSecure>
  </v-container>
</template>

<script>
import Dashboard from '@/components/common/Dashboard.vue';
import minesOperatorScreeningService from '@/services/minesOperatorScreeningService';
import { AppClients } from '@/utils/constants';

export default {
  name: 'Dashboards',
  components: {
    Dashboard
  },
  computed: {
    dashboardUrl() {
      return undefined;
    },
    resource() {
      return AppClients.MINESOPERATORSCREENING;
    }
  },
  data: () => ({
    dashboards: [],
    loading: true,
    tab: null
  }),
  methods: {
    getDashboards() {
      this.loading = true;
      minesOperatorScreeningService
        .getDashboardSettings()
        .then(response => {
          this.dashboards = response.data.config;
        })
        .catch(error => {
          console.error(`Error getting dashboard settings: ${error}`); // eslint-disable-line no-console
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getDashboards();
  }
};
</script>
