<template>
  <header class="gov-header">
    <v-toolbar color="#003366" flat>
      <!-- Navbar content -->
      <a href="https://www2.gov.bc.ca" data-test="btn-header-logo">
        <v-img
          alt="B.C. Government Logo"
          class="d-flex d-md-none"
          contain
          height="3.5rem"
          src="@/assets/images/bc_logo_square.svg"
          width="3.5rem"
        />
        <v-img
          alt="B.C. Government Logo"
          class="d-none d-md-flex"
          contain
          height="3.5rem"
          src="@/assets/images/bc_logo.svg"
          width="10rem"
        />
      </a>
      <div data-test="btn-header-title" class="title">{{ appTitle }}</div>
      <v-spacer />
      <BaseAuthButton />
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'BCGovHeader',
  computed: {
    appTitle() {
      return this.$route && this.$route.meta && this.$route.meta.title
        ? this.$route.meta.title
        : process.env.VUE_APP_TITLE;
    }
  }
};
</script>

<style lang="scss" scoped>
.gov-header {
  border-bottom: 2px solid #fcba19;
  .title {
    color: #ffffff;
    overflow: hidden;
    padding: 1rem;
  }
}
</style>
