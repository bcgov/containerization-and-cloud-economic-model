<template>
  <div>
    <AdminNavBar :resource="resource" />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import AdminNavBar from '@/components/minesoperatorscreening/admin/AdminNavBar.vue';
import agriSeafoodOpScreeningForm from '@/store/modules/agriseafoodopscreening/agriSeafoodOpScreeningForm.js';
import { AppClients } from '@/utils/constants';

export default {
  name: 'AgricultureSeafoodOperatorScreening',
  components: {
    AdminNavBar
  },
  beforeDestroy() {
    this.$store.unregisterModule('agriSeafoodOpScreeningForm');
  },
  computed: {
    resource() {
      return AppClients.AGRISEAFOODOPSCREENING;
    }
  },
  created() {
    if(this.$store.hasModule('agriSeafoodOpScreeningForm')) {
      this.$store.unregisterModule('agriSeafoodOpScreeningForm');
    }
    this.$store.registerModule('agriSeafoodOpScreeningForm', agriSeafoodOpScreeningForm);
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
