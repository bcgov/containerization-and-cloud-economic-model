<template>
  <div v-if="defined" class="dashboard-container">
    <iframe :src="url" />
  </div>
  <div v-else>
    <p class="text-center">No dashboard has been configured.</p>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    defined() {
      return typeof this.url !== 'undefined';
    }
  },
  props: {
    url: {
      required: false
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
