<template>
  <v-container>
    <BaseSecure :resource="resource" admin>
      <h1 class="mb-6">Team Management</h1>
      <TeamTable :formName="formName" />
    </BaseSecure>
  </v-container>
</template>

<script>
import { AppClients, FormNames } from '@/utils/constants';
import TeamTable from '@/components/common/TeamTable';

export default {
  name: 'Team',
  components: {
    TeamTable
  },
  computed: {
    formName() {
      return FormNames.FORESTRYSECTOROPSCREENING;
    },
    resource() {
      return AppClients.FORESTRYSECTOROPSCREENING;
    }
  }
};
</script>
