<template>
  <v-container>
    <BaseSecure :resource="resource" admin>
      <h1 class="mb-6">Settings</h1>
      <SettingsPanel />
    </BaseSecure>
  </v-container>
</template>

<script>
import { AppClients } from '@/utils/constants';
import SettingsPanel from '@/components/agriseafoodopscreening/admin/settings/SettingsPanel.vue';

export default {
  name: 'Settings',
  components: {
    SettingsPanel
  },
  computed: {
    resource() {
      return AppClients.AGRISEAFOODOPSCREENING;
    }
  }
};
</script>
