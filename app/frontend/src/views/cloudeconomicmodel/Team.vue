<template>
  <v-container>
    <h1 class="mb-6">Team Management</h1>
    <TeamTable :formName="formName" />
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
      return FormNames.CLOUDECONOMICMODEL;
    },
    resource() {
      return AppClients.cloudeconomicmodel;
    }
  }
};
</script>
