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
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavBar',
  computed: {
    isAdminPage() {
      return this.$route.path.match(/\/admin/g);
    }
  }
};
</script>
