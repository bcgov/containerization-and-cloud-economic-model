<template>
  <transition name="component-fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'MinesAttestations'
};
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
