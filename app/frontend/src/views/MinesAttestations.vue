<template>
  <div>
    <AdminNavBar />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AdminNavBar from '@/components/minesattestations/admin/AdminNavBar.vue';

export default {
  name: 'MinesAttestations',
  components: {
    AdminNavBar
  }
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
