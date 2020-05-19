<template>
  <div>
    <BCGovNavBar />
    <v-container>
      <h1 class="my-6 text-center">Forms</h1>
      <FormList />
    </v-container>
  </div>
</template>

<script>
import BCGovNavBar from '@/components/bcgov/BCGovNavBar.vue';
import FormList from '@/components/FormList.vue';

export default {
  name: 'Home',
  components: {
    BCGovNavBar,
    FormList
  }
};
</script>
