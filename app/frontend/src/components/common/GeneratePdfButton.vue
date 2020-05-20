<template>
  <a v-on:click="generatePdf()" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'GeneratePdfButton',
  computed: {
    formName() {
      return this.$route.path.split('/')[1];
    }
  },
  methods: {
    generatePdf() {
      const pdf = `${this.$config.basePath}/${this.$config.apiPath}/${this.formName}/submissions/${this.submissionId}/pdf`;
      window.open(pdf, '_blank');
    }
  },
  props: {
    submissionId: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none !important;
}
</style>
