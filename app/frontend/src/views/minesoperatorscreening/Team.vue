<template>
  <v-container>
    <BaseSecure :resource="resource" admin>
      <h1 class="mb-6">Team Management</h1>
    </BaseSecure>
  </v-container>
</template>

<script>
import { AppClients } from '@/utils/constants';

export default {
  name: 'Team',
  computed: {
    resource() {
      return AppClients.MINESOPERATORSCREENING;
    }
  }
};
</script>
