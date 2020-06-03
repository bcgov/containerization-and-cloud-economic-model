<template>
  <div>
    <v-progress-linear indeterminate v-if="gettingSettings" color="primary" class="mb-2" />

    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <div v-if="!gettingSettings">
      <v-expansion-panels>
        <v-expansion-panel v-for="item in settings" :key="item.name">
          <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <SettingItem :item="item" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>

import minesOperatorScreeningService from '@/services/minesOperatorScreeningService';
import SettingItem from '@/components/minesoperatorscreening/admin/settings/SettingItem.vue';

export default {
  name: 'SettingsPanel',
  components: {
    SettingItem
  },
  data: () => ({
    error: false,
    gettingSettings: false,
    settings: []
  }),
  methods: {
    async getSettings() {
      this.error = '';
      this.gettingSettings = true;
      try {
        const response = await minesOperatorScreeningService.getSettings();
        this.settings = response.data;
      } catch (error) {
        console.log(`Error occurred getting Settings: ${error}`); // eslint-disable-line no-console
        this.error = 'Failed to fetch Settings from the Database';
      } finally {
        this.gettingSettings = false;
      }
    }
  },
  created() {
    this.getSettings();
  }
};
</script>

<style  scoped>
.v-expansion-panel-header {
  font-weight: bold;
  color: #003366 !important;
  font-size: 1.1em;
}
</style>
