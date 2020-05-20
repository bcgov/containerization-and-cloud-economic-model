<template>
  <a v-on:click="printScreen()" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'PrintScreenButton',
  methods: {
    printScreen(){
      window.print();
    }
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none !important;
}
</style>
