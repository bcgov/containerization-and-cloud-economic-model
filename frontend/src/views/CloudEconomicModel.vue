<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import form from '@/store/modules/cloudEconomicModel.js';

export default {
  name: 'CloudEconomicModel',
  beforeDestroy() {
    this.$store.unregisterModule('form');
  },
  created() {
    if (this.$store.hasModule('form')) {
      this.$store.unregisterModule('form');
    }
    this.$store.registerModule('form', form);
  },
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
