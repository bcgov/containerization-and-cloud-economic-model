<template>
  <div>
    <AdminNavBar :resource="resource" />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AdminNavBar from '@/components/forestrysectoropscreening/admin/AdminNavBar.vue';
import forestrySectorOpScreeningForm from '@/store/modules/forestrysectoropscreening/forestrySectorOpScreeningForm.js';
import { AppClients } from '@/utils/constants';

export default {
  name: 'ForestrySectorOpScreening',
  components: {
    AdminNavBar
  },
  beforeDestroy() {
    this.$store.unregisterModule('forestrySectorOpScreeningForm');
  },
  computed: {
    resource() {
      return AppClients.FORESTRYSECTOROPSCREENING;
    }
  },
  created() {
    if(this.$store.hasModule('forestrySectorOpScreeningForm')) {
      this.$store.unregisterModule('forestrySectorOpScreeningForm');
    }
    this.$store.registerModule('forestrySectorOpScreeningForm', forestrySectorOpScreeningForm);
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
