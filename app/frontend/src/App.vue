<template>
  <v-app>
    <BCGovHeader />

    <v-main>
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>

    <BCGovFooter />
  </v-app>
</template>

<script>
import BCGovHeader from '@/components/bcgov/BCGovHeader.vue';
import BCGovFooter from '@/components/bcgov/BCGovFooter.vue';

export default {
  name: 'App',
  components: {
    BCGovHeader,
    BCGovFooter
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
