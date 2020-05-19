<template>
  <nav v-if="!isForm" class="navigation-main">
    <div class="container">
      <ul>
        <li>
          <router-link :to="{ name: 'MinesAttestationsAdmin' }">Submissions</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'MinesAttestationsDashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'MinesAttestationsInspectionDashboard' }">Inspection Dashboard</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavBar',
  computed: {
    isForm() {
      return this.$route.name === 'MinesAttestationsForm';
    }
  }
};
</script>
