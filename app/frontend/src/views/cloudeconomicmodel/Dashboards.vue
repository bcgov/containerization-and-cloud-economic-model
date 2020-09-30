<template>
  <v-container fluid>
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <div v-else>
      <h1 v-if="!dashboards.length" class="my-8 text-center">No dashboards configured.</h1>
      <div v-else>
        <v-tabs v-model="tab">
          <v-tab v-for="dashboard in dashboards" :key="dashboard.name">{{ dashboard.name }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="dashboard in dashboards" :key="dashboard.name">
            <Dashboard :resource="resource" :roles="dashboard.roles" :url="dashboard.url" />
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
  </v-container>
</template>

<script>
import Dashboard from '@/components/common/Dashboard.vue';
import commonFormService from '@/services/commonFormService';
import { AppSettings, FormNames } from '@/utils/constants';

export default {
  name: 'Dashboards',
  components: {
    Dashboard
  },
  data: () => ({
    dashboards: [],
    loading: true,
    tab: null
  }),
  methods: {
    async getDashboards() {
      this.loading = true;
      try {
        const response = await commonFormService.getNamedSetting(
          FormNames.CLOUDECONOMICMODEL,
          AppSettings.DASHBOARD
        );
        this.dashboards = response.data.config;
      } catch (error) {
        console.error(`Error getting dashboard settings: ${error}`); // eslint-disable-line no-console
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getDashboards();
  }
};
</script>
