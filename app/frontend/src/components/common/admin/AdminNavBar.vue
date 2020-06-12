<template>
  <nav v-if="isAdminPage" class="navigation-main">
    <div class="container">
      <ul>
        <li>
          <router-link
            data-test="btn-navbar-submissions"
            :to="{ path: `/${formName}/admin` }"
          >Submissions</router-link>
        </li>
        <li>
          <router-link
            data-test="btn-navbar-dashboards"
            :to="{ path: `/${formName}/admin/dashboard` }"
          >Dashboards</router-link>
        </li>
        <li v-if="isAdmin">
          <router-link data-test="btn-navbar-team" :to="{ path: `/${formName}/admin/team` }">Team</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

import { AppRoles, getAppClient } from '@/utils/constants';

export default {
  name: 'AdminNavBar',
  computed: {
    ...mapGetters('auth', ['hasResourceRoles']),
    isAdmin() {
      return this.hasResourceRoles(getAppClient(this.formName), [
        AppRoles.ADMIN
      ]);
    },
    isAdminPage() {
      return this.$route.path.match(/\/admin/g);
    }
  },
  props: {
    formName: {
      type: String,
      required: true
    }
  }
};
</script>
