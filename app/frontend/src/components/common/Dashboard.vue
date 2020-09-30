<template>
  <div class="dashboard-container">
    <iframe :src="url" />
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  computed: {
    defined() {
      return typeof this.url === 'string' || this.url instanceof String;
    }
  },
  props: {
    resource: {
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
