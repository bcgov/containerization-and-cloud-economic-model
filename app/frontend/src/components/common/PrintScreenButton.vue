<template functional>
  <a v-on:click="$options.printScreen()" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'PrintScreenButton',
  printScreen() {
    window.print();
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none !important;
}
</style>
