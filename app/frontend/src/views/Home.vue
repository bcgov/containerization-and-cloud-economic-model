<template>
  <v-container>
    <h1 class="my-6">COVID-19 Operator Screening Forms</h1>
    <p>Operator Screening forms are built in support of the Provincial Health Order for COVID-19 Industrial Camps. The order requires that all work site operations, which have worker accommodations, are required to submit to the province an attestation confirming that they have created and implemented the protocol at their worksite.
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
