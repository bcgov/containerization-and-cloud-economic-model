<template>
  <v-combobox
    dense
    outlined
    flat
    solo
    v-model="fieldModel"
    :rules="rules"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    v-on:change="change"
    clearable
    hide-no-data
    hide-selected
    label="City Lookup"
    placeholder="Start typing to search for cities in BC"
    prepend-inner-icon="search"
    append-icon
  ></v-combobox>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'CityLookup',
  props: {
    fieldModel: String,
    fieldRules: Array,
  },
  data() {
    return {
      isLoading: false,
      features: [],
      search: null,
      rules: this.fieldRules,
    };
  },
  computed: {
    items() {
      return this.features.map((feature) => {
        /* Example result.
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "crs": {
                "type": "EPSG",
                "properties": {
                  "code": 4326
                }
              },
              "coordinates": [
                -116.9647222,
                51.2977778
              ]
            },
            "properties": {
              "fullAddress": "Golden, BC",
              "score": 67,
              "matchPrecision": "LOCALITY",
              "precisionPoints": 68,
              "faults": [
                {
                  "element": "PROVINCE",
                  "fault": "missing",
                  "penalty": 1
                }
              ],
              "localityType": "Town",
              "electoralArea": "",
              "locationPositionalAccuracy": "coarse",
              "locationDescriptor": "localityPoint",
              "siteID": "",
              "blockID": "",
              "accessNotes": "",
              "siteStatus": ""
            }
          },
         */
        return Object.assign({
          text: feature.properties.fullAddress,
          value: feature.properties.fullAddress,
          cityLatitude: feature.geometry.coordinates[1],
          cityLongitude: feature.geometry.coordinates[0]
        });
      });
    },
    apiURL() {
      if (Vue.prototype.$config) {
        const config = Vue.prototype.$config;
        return config.geocoder.endpoint;
      } else {
        throw new Error('Settings object is missing.');
      }
    },
  },
  methods: {
    change: function (value) {
      this.$emit(
        'update:field-model',
        typeof value === 'object' && value !== null ? value.text : value
      );
      this.$emit(
        'update:latitude',
        typeof value === 'object' && value !== null ? value.cityLatitude : null
      );

      this.$emit(
        'update:longitude',
        typeof value === 'object' && value !== null ? value.cityLongitude : null
      );
    },
  },
  watch: {
    search(val) {
      // Minimum search length is 1 character
      if (!val || val.length < 1) return;

      // A search has already been started
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load results
      fetch(
        `${this.apiURL}/addresses.json?autocomplete=true&addressString=${encodeURIComponent(
          val
        )}&minScore=50&maxResults=5&echo=false&brief=true`
      )
        .then((res) => res.json())
        .then((res) => {
          this.count = res.features.length;
          this.features = res.features;
        })
        .catch((err) => {
          // eslint-disable-next-line
            console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
