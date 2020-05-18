<template>
  <div>
    <BCGovNavBar />
    <v-container>
      <h1 class="my-6 text-center">Welcome to Vuetify</h1>
    </v-container>
  </div>
</template>

<script>
import BCGovNavBar from '@/components/bcgov/BCGovNavBar.vue';

export default {
  name: 'Home',
  components: {
    BCGovNavBar
  }
};
</script>
