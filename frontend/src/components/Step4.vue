<template>
  <v-container>
    <div class="hide-on-review">
      <h2 class="mb-8">Cloud Economic Model</h2>
      <p class="mb-8">
        Thank you for using this forecasting tool. Please expect to receive an
        email shortly.
      </p>
      <p class="mb-8">Please close this window at any time.</p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'CloudEconomicModelStep2',
  mounted() {
    if (!this.reviewMode) {
      // Enable "leave site" native browser warning
      window.onbeforeunload = null;
    }
  },
};
</script>
