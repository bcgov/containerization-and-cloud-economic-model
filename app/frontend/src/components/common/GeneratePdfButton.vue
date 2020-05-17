<template>
  <a v-on:click="generatePdf()" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'GeneratePdfButton',
  props: {
    ipcPlanId: {
      type: String,
      required: true
    }
  },
  methods: {
    generatePdf(){
      alert('TBD');
      // const pdf = `${this.$config.basePath}/${this.$config.apiPath}/ipc/pdf/${this.ipcPlanId}`;
      // window.open(pdf, '_blank');
    }
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none !important;
}
</style>
