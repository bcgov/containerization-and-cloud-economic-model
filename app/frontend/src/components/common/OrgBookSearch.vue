<template>
  <div>
    <v-combobox
      dense
      outlined
      flat
      solo
      v-model="fieldModel"
      data-test="text-form-orgbook-search-fieldModel"
      :rules="fieldRules"
      :items="items"
      :loading="loading"
      :search-input.sync="search"
      v-on:change="change"
      clearable
      hide-no-data
      hide-selected
      label="OrgBook Lookup"
      placeholder="Start typing to search the OrgBook database"
      prepend-inner-icon="mdi-database-search"
      append-icon
    />
    <!-- Org Book help message -->
    <BaseInfoCard v-if="showOrgBookHelp" class="ml-8 mb-5">
      <p>Business Name Not Found. Try searching again?</p>
      <p class="mb-0">
        If you are already registered but can't find your name, you can still complete this form.
        Information on registering a business can be found on the
        <a
          href="https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies"
          target="_blank"
        >BC Government website under "Businesses and Incorporated Companies"</a>.
      </p>
    </BaseInfoCard>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrgBookSearch',
  props: {
    fieldModel: String,
    fieldRules: Array
  },
  data: () => ({
    count: 0,
    entries: [],
    loading: false,
    search: null,
    showOrgBookHelp: false
  }),
  computed: {
    items() {
      return this.entries.map(entry => {
        // there will only ever be 1 result in the names array
        return {
          text: entry.names[0].text,
          value: entry.names[0].text
        };
      });
    }
  },
  methods: {
    apiURL() {
      if (this.$config && this.$config.orgbook) {
        return this.$config.orgbook.endpoint;
      } else {
        throw new Error('Settings object is missing.');
      }
    },
    change(value) {
      this.$emit(
        'update:field-model',
        // For this use, want to emit just the text
        typeof value === 'object' && value !== null ? value.text : value
      );

      // show Org Book warning and help message when user enters a business name not found in the Org Book
      this.showOrgBookHelp = value && !this.foundInOrgBook(value.text);
    },
    // Check if user input matched an Org Book suggestion
    foundInOrgBook(inputValue) {
      const arrayOfOrgBookValues = this.entries.map(result => {
        return result.names[0].text;
      });
      return arrayOfOrgBookValues.includes(inputValue);
    }
  },
  watch: {
    async search(val) {
      // Minimum search length is 1 character
      if (!val || val.length < 1) return;

      // A search has already been started
      if (this.loading) return;

      // Lazily load results
      this.loading = true;
      try {
        const response = await axios.get(`${this.apiURL()}/search/autocomplete`, {
          params: {
            inactive: false,
            latest: true,
            q: val,
            revoked: false
          }
        });
        const data = response.data;
        this.count = data.results.length;
        this.entries = data.results;
      } catch (err) {
        console.log(err); // eslint-disable-line no-console
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
