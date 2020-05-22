<template>
  <div v-if="hasResourceRoles(resource, roles)" class="dashboard-container">
    <iframe v-if="defined" :src="url" />
    <h1 v-else class="my-8 text-center">No dashboard has been configured.</h1>
  </div>
  <div v-else>
    <h1 class="my-8 text-center">You are not authorized to view this dashboard.</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { AppClients } from '@/utils/constants';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters('auth', ['hasResourceRoles']),
    defined() {
      return typeof this.url === 'string' || this.url instanceof String;
    }
  },
  props: {
    resource: {
      default: AppClients.APP,
      type: String
    },
    roles: {
      type: Array
    },
    url: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  @media only screen and (min-width: 810px) {
    height: calc(100vh);
  }
  @media only screen and (max-width: 809px) {
    height: calc(100vh * 2.5);
  }

  iframe {
    border: 0;
    height: 100%;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
