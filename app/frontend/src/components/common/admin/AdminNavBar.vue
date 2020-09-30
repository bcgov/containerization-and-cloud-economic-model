<template>
  <nav class="navigation-main">
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
  },
  props: {
    formName: {
      type: String,
      required: true
    }
  }
};
</script>
