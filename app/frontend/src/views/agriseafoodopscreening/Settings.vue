<template>
  <v-container>
    <BaseSecure :resource="resource" admin>
      <h1 class="mb-6">Settings</h1>
      <SettingsPanel :formName="formName" />
    </BaseSecure>
  </v-container>
</template>

<script>
import { AppClients, FormNames } from '@/utils/constants';
import SettingsPanel from '@/components/common/admin/settings/SettingsPanel.vue';

export default {
  name: 'Settings',
  components: {
    SettingsPanel
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
