<template>
  <v-combobox
    dense
    outlined
    flat
    solo
    v-model="fieldModel"
    data-test="text-form-city-lookup-fieldModel"
    :rules="fieldRules"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    v-on:change="change"
    clearable
    hide-no-data
    hide-selected
    label="City Lookup"
    placeholder="Start typing to search for cities in BC"
    prepend-inner-icon="search"
    append-icon
  />
</template>

<script>
import axios from 'axios';

export default {
  name: 'CityLookup',
  props: {
    fieldModel: String,
    fieldRules: Array
  },
  data: () => ({
    count: 0,
    loading: false,
    features: [],
    search: null
  }),
  computed: {
    items() {
      return this.features.map(feature => {
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
        return {
          text: feature.properties.fullAddress,
          value: feature.properties.fullAddress,
          cityLatitude: feature.geometry.coordinates[1],
          cityLongitude: feature.geometry.coordinates[0]
        };
      });
    }
  },
  methods: {
    apiURL() {
      if (this.$config && this.$config.geocoder) {
        return this.$config.geocoder.endpoint;
      } else {
        throw new Error('Settings object is missing.');
      }
    },
    change(value) {
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
        const response = await axios.get(`${this.apiURL()}/addresses.json`, {
          params: {
            addressString: val,
            autocomplete: true,
            brief: true,
            echo: false,
            maxResults: 5,
            minScore: 50
          }
        });
        const data = response.data;
        this.count = data.features.length;
        this.features = data.features;
      } catch (err) {
        console.log(err); // eslint-disable-line no-console
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
