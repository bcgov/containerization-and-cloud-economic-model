<template>
  <nav v-if="isAdminPage" class="navigation-main">
    <div class="container">
      <ul>
        <li>
          <router-link :to="{ name: 'MinesOperatorScreeningAdmin' }">Submissions</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'MinesOperatorScreeningDashboards' }">Dashboards</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link :to="{ name: 'MinesOperatorScreeningTeam' }">Team</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// TODO: Consider way of converting this into a common component
import { mapGetters } from 'vuex';

import { AppRoles } from '@/utils/constants';

export default {
  name: 'AdminNavBar',
  computed: {
    ...mapGetters('auth', ['hasResourceRoles']),
    isAdminPage() {
      return this.$route.path.match(/\/admin/g);
    }
  },
  methods: {
    isAdmin() {
      return this.hasResourceRoles(this.resource, AppRoles.ADMIN);
    }
  },
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>
