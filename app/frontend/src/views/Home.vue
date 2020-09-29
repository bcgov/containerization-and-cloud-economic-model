<template>
  <v-container>
    <h1 class="my-6">Forecasting Forms</h1>
    <p>Forms for spreadsheet generation used in forecasting.
    </p>
    <FormList />
  </v-container>
</template>

<script>
import FormList from '@/components/FormList.vue';

export default {
  name: 'Home',
  components: {
    FormList
  }
};
</script>
