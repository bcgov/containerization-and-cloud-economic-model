<template functional>
  <a
    :href="`${parent.$config.basePath}/${parent.$config.apiPath}/${props.formName}/submissions/${props.submissionId}/pdf`"
    target="_blank"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'GeneratePdfButton',
  props: {
    formName: {
      type: String,
      required: true
    },
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
