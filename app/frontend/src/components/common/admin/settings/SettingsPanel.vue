<template>
  <div>
    <v-progress-linear indeterminate v-if="gettingSettings" color="primary" class="mb-2" />

    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <v-expansion-panels v-if="!gettingSettings">
      <v-expansion-panel v-for="item in settings" :key="item.name">
        <v-expansion-panel-header :data-test="`btn-panel-${item.name}`">{{ item.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <SettingItem :item="item" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import commonFormService from '@/services/commonFormService';
import SettingItem from '@/components/common/admin/settings/SettingItem.vue';

export default {
  name: 'SettingsPanel',
  components: {
    SettingItem
  },
  props: {
    formName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    error: false,
    loading: true,
    settings: []
  }),
  methods: {
    async getSettings() {
      this.error = '';
      this.loading = true;
      try {
        const response = await commonFormService.getSettings(this.formName);
        this.settings = response.data;
      } catch (error) {
        console.log(`Error occurred getting Settings: ${error}`); // eslint-disable-line no-console
        this.error = 'Failed to fetch Settings from the Database';
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.getSettings();
  }
};
</script>

<style scoped>
.v-expansion-panel-header {
  font-weight: bold;
  color: #003366 !important;
  font-size: 1.1em;
}
</style>
