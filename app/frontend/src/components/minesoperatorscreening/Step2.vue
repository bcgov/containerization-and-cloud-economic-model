<template>
  <v-container>
    <div class="hide-on-review">
      <v-btn
        class="mb-5"
        outlined
        color="primary"
        @click="sampleData"
      >FOR TEST ONLY - FILL SAMPLE DATA</v-btn>
      <h2 class="pb-8">Provide Your Business Contact Information</h2>
      <hr class="orange" />
    </div>

    <v-form ref="form" v-model="step2Valid">
      <v-container>
        <v-row>
          <v-col cols="12" lg="10">
            <h4 class="heading-field-label mb-1">Registered Business Name</h4>
            <OrgBookSearch
              v-if="!reviewMode"
              :field-model.sync="businessName"
              :field-rules="businessNameRules"
            />
            <v-text-field
              v-if="reviewMode"
              dense
              flat
              outlined
              solo
              v-model="businessName"
              :rules="businessNameRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Primary Contact</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>First Name</label>
            <v-text-field dense flat outlined solo v-model="firstName" :rules="firstNameRules" />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Last Name</label>
            <v-text-field dense flat outlined solo v-model="lastName" :rules="lastNameRules" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              :rules="phone1Rules"
              prepend-inner-icon="phone"
              v-model="phone1"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="phone2"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>E-mail Address (Primary Contact)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="john.doe@example.com"
              :rules="emailRules"
              prepend-inner-icon="email"
              v-model="email"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>Business Address</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Address line 1</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressLine1"
              :rules="businessAddressLine1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Address line 2 (Optional)</label>
            <v-text-field dense flat outlined solo v-model="businessAddressLine2" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>City</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressCity"
              :rules="businessAddressCityRules"
            />
          </v-col>
          <v-col cols="12" sm="3" lg="2">
            <label>Province</label>
            <v-select
              :items="provinces"
              dense
              flat
              outlined
              solo
              single-line
              label="Select"
              v-model="businessAddressProvince"
              :rules="businessAddressProvinceRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="3" lg="2">
            <label>Postal Code</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressPostalCode"
              :rules="businessAddressPostalCodeRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h4>COVID-19 Coordinator</h4>
        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>First Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidFirstName"
              :rules="covidFirstNameRules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Last Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidLastName"
              :rules="covidLastNameRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone1"
              :rules="covidPhone1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="5">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone2"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>E-mail Address (Primary Contact)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="john.doe@example.com"
              prepend-inner-icon="email"
              v-model="covidEmail"
              :rules="covidEmailRules"
            />
          </v-col>
        </v-row>

        <hr />
        <h4>Provide your accomodation details</h4>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <label>Operation Start Date</label>
                <v-text-field
                  v-model="startDate"
                  :rules="startDateRules"
                  placeholder="yyyy-mm-dd"
                  append-icon="event"
                  v-on:click:append="startDateMenu=true"
                  readonly
                  v-on="on"
                  dense
                  flat
                  outlined
                  solo
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="startDateMenu = false"
                :readonly="reviewMode"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" lg="5">
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <label>Operation End Date</label>
                <v-text-field
                  v-model="endDate"
                  :rules="endDateRules"
                  placeholder="yyyy-mm-dd"
                  append-icon="event"
                  v-on:click:append="endDateMenu=true"
                  readonly
                  v-on="on"
                  dense
                  flat
                  outlined
                  solo
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" @input="endDateMenu = false" :readonly="reviewMode"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" lg="5">
            <label>Closest Community / Town / City</label>
            <CityLookup
              v-if="!reviewMode"
              :field-model.sync="locationCity"
              :latitude.sync="cityLatitude"
              :longitude.sync="cityLongitude"
              :field-rules="locationCityRules"
            />
            <v-text-field
              v-if="reviewMode"
              dense
              flat
              outlined
              solo
              v-model="locationCity"
              :rules="locationCityRules"
            />
            <v-text-field v-model="cityLatitude" class="d-none" />
            <v-text-field v-model="cityLongitude" class="d-none" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" lg="3">
            <label>Number of workers at this location</label>
            <v-text-field
              v-model="numberOfWorkers"
              :rules="numberOfWorkersRules"
              type="number"
              min="1"
              dense
              flat
              outlined
              solo
            />
          </v-col>
        </v-row>

        <h4>Type of accommodation for workers at this location (check all that apply)</h4>

        <v-checkbox v-model="accTents" :readonly="reviewMode" label="Tents near worksite"></v-checkbox>

        <div v-if="accTents">
          <v-row>
            <v-col cols="12" lg="10">
              <label>
                Details (eg:
                <em>"1km from HWY 1 at 100 mile house north on Logging Road"</em>)
              </label>
              <v-text-field v-model="tentDetails" dense flat outlined solo />
            </v-col>
          </v-row>
        </div>

        <v-checkbox v-model="accMotel" :readonly="reviewMode" label="Motel / Hotel in town"></v-checkbox>
        <div v-if="accMotel">
          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Name</label>
              <v-text-field v-model="motelName" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Address line 1</label>
              <v-text-field v-model="motelAddressLine1" dense flat outlined solo />
            </v-col>

            <v-col cols="12" sm="6" lg="5">
              <label>Address line 2 (Optional)</label>
              <v-text-field v-model="motelAddressLine2" dense flat outlined solo />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>City</label>
              <v-text-field v-model="motelCity" dense flat outlined solo />
            </v-col>
            <v-col cols="12" sm="3" lg="2">
              <label>Province</label>
              <v-select
                dense
                flat
                outlined
                solo
                single-line
                label="select"
                v-model="motelProvince"
                :items="provinces"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="3" lg="2">
              <label>Postal Code</label>
              <v-text-field v-model="motelPostalCode" dense flat outlined solo />
            </v-col>
          </v-row>
        </div>

        <v-checkbox
          v-model="accWorkersHome"
          :readonly="reviewMode"
          label="Worker's home in community"
        ></v-checkbox>
      </v-container>

      <div class="hide-on-review">
        <h2 class="pb-8 mt-8">Authorization Information</h2>
        <hr class="orange" />
      </div>

      <v-container>
        <h4>Please enter your mine identifier(s)</h4>
        <v-row align="center">
          <v-col cols="12" sm="5">
            <label>Mine Number</label>
            <v-text-field dense flat outlined solo v-model="mineNumber" :rules="mineNumberRules" />
          </v-col>
          <v-col cols="12" sm="1" class="text-sm-center pb-5 pb-sm-0" ><span class="hide-on-review">or</span></v-col>
          <v-col cols="12" sm="6" md="5">
            <label>Mines Act Permit</label>
            <v-text-field dense flat outlined solo />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div class="hide-on-review">
      <hr />

      <v-btn color="primary" @click="submit">Go to Step 3</v-btn>
      <v-btn text @click="setStep(1)">Back</v-btn>
    </div>
  </v-container>
</template>

<script>
import validator from 'validator';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import CityLookup from '@/components/common/CityLookup.vue';
import OrgBookSearch from '@/components/common/OrgBookSearch.vue';

export default {
  name: 'MinesAttestationStep2',
  props: {
    reviewMode: Boolean
  },
  components: {
    CityLookup,
    OrgBookSearch
  },
  data() {
    return {
      step2Valid: false,
      validationFailed: false,
      startDateMenu: false,
      endDateMenu: false,

      // Todo: constants file
      provinces: ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'],

      // Business
      businessNameRules: [
        v => !!v || 'Business name is required',
      ],
      businessAddressLine1Rules: [
        v => !!v || 'Business address is required',
      ],
      businessAddressCityRules: [
        v => !!v || 'City is required',
      ],
      businessAddressProvinceRules: [
        v => !!v || 'Province is required',
      ],
      businessAddressPostalCodeRules: [
        v => !!v || 'Postal Code is required',
      ],

      // Contact
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 100) || 'First name must be less than 100? characters',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 100) || 'Last name must be less than 100? characters',
      ],
      phone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'E-mail must be less than 100? characters',
      ],

      // Covid Contact
      covidFirstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length <= 100) || 'First name must be less than 100? characters',
      ],
      covidLastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length <= 100) || 'Last name must be less than 100? characters',
      ],
      covidPhone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
      ],
      covidEmailRules: [
        v => !!v || 'E-mail is required',
        v=> validator.isEmail(v, { allow_display_name: true }) || 'invalid e-mail format',
        v => (v && v.length <= 100) || 'E-mail must be less than 100? characters',
      ],

      // Location
      mineNumberRules: [
        v => !!v || 'Mine Act Permit or Mine Number is required',
        v => (v && v.length <= 255) || 'Number must be less than 255 characters',
      ],
      startDateRules: [
        v => !!v || 'Start date is required'
      ],
      endDateRules: [
        v => !!v || 'End date is required'
      ],
      locationCityRules: [
        v => !!v || 'Closest Community / Town / City is required'
      ],
      // Todo, put in some utility fxn somewhere if needed again
      numberOfWorkersRules: [
        v => (new RegExp('^[-+]?\\d+$')).test(v) || 'invalid # of workers',
        v => v > 0 || '# of workers must be greater than 0',
        v => v < 9999 || '# of workers must 9999 or less'
      ],
    };
  },
  computed: {
    ...mapGetters('form', ['business', 'primaryContact', 'covidContact', 'location']),

    // Business
    businessName: {
      get() { return this.business.name; },
      set(value) { this.updateBusiness({['name']: value}); }
    },
    businessAddressLine1: {
      get() { return this.business.addressLine1; },
      set(value) { this.updateBusiness({['addressLine1']: value}); }
    },
    businessAddressLine2: {
      get() { return this.business.addressLine2; },
      set(value) { this.updateBusiness({['addressLine2']: value}); }
    },
    businessAddressCity: {
      get() { return this.business.city; },
      set(value) { this.updateBusiness({['city']: value}); }
    },
    businessAddressProvince: {
      get() { return this.business.province; },
      set(value) { this.updateBusiness({['province']: value}); }
    },
    businessAddressPostalCode: {
      get() { return this.business.postalCode; },
      set(value) { this.updateBusiness({['postalCode']: value}); }
    },

    // Contact
    firstName: {
      get() { return this.primaryContact.firstName; },
      set(value) { this.updatePrimaryContact({['firstName']: value}); }
    },
    lastName: {
      get() { return this.primaryContact.lastName; },
      set(value) { this.updatePrimaryContact({['lastName']: value}); }
    },
    phone1: {
      get() { return this.primaryContact.phone1; },
      set(value) { this.updatePrimaryContact({['phone1']: value}); }
    },
    phone2: {
      get() { return this.primaryContact.phone2; },
      set(value) { this.updatePrimaryContact({['phone2']: value}); }
    },
    email: {
      get() { return this.primaryContact.email; },
      set(value) { this.updatePrimaryContact({['email']: value}); }
    },

    // COVID Coordinator
    covidFirstName: {
      get() { return this.covidContact.firstName; },
      set(value) { this.updateCovidContact({['firstName']: value}); }
    },
    covidLastName: {
      get() { return this.covidContact.lastName; },
      set(value) { this.updateCovidContact({['lastName']: value}); }
    },
    covidPhone1: {
      get() { return this.covidContact.phone1; },
      set(value) { this.updateCovidContact({['phone1']: value}); }
    },
    covidPhone2: {
      get() { return this.covidContact.phone2; },
      set(value) { this.updateCovidContact({['phone2']: value}); }
    },
    covidEmail: {
      get() { return this.covidContact.email; },
      set(value) { this.updateCovidContact({['email']: value}); }
    },

    // Location
    mineNumber: {
      get() { return this.location.mineNumber; },
      set(value) { this.updateLocation({['mineNumber']: value}); }
    },
    startDate: {
      get() { return this.location.startDate; },
      set(value) { this.updateLocation({['startDate']: value}); }
    },
    endDate: {
      get() { return this.location.endDate; },
      set(value) { this.updateLocation({['endDate']: value}); }
    },
    locationCity: {
      get() { return this.location.city; },
      set(value) { this.updateLocation({['city']: value}); }
    },
    cityLatitude: {
      get() { return this.location.cityLatitude; },
      set(value) { this.updateLocation({['cityLatitude']: value}); }
    },
    cityLongitude: {
      get() { return this.location.cityLongitude; },
      set(value) { this.updateLocation({['cityLongitude']: value}); }
    },
    numberOfWorkers: {
      get() { return this.location.numberOfWorkers ? this.location.numberOfWorkers.toString() : ''; },
      set(value) { this.updateLocation({['numberOfWorkers']:
        Number.isNaN(value) ? 0 : Number.parseInt(value)});
      }
    },
    accTents: {
      get() { return this.location.accTents; },
      set(value) { this.updateLocation({['accTents']: value}); }
    },
    tentDetails: {
      get() { return this.location.tentDetails; },
      set(value) { this.updateLocation({['tentDetails']: value}); }
    },
    accMotel: {
      get() { return this.location.accMotel; },
      set(value) { this.updateLocation({['accMotel']: value}); }
    },
    motelName: {
      get() { return this.location.motelName; },
      set(value) { this.updateLocation({['motelName']: value}); }
    },
    motelAddressLine1: {
      get() { return this.location.motelAddressLine1; },
      set(value) { this.updateLocation({['motelAddressLine1']: value}); }
    },
    motelAddressLine2: {
      get() { return this.location.motelAddressLine2; },
      set(value) { this.updateLocation({['motelAddressLine2']: value}); }
    },
    motelCity: {
      get() { return this.location.motelCity; },
      set(value) { this.updateLocation({['motelCity']: value}); }
    },
    motelProvince: {
      get() { return this.location.motelProvince; },
      set(value) { this.updateLocation({['motelProvince']: value}); }
    },
    motelPostalCode: {
      get() { return this.location.motelPostalCode; },
      set(value) { this.updateLocation({['motelPostalCode']: value}); }
    },
    accWorkersHome: {
      get() { return this.location.accWorkersHome; },
      set(value) { this.updateLocation({['accWorkersHome']: value}); }
    },
  },
  methods: {
    ...mapActions('form', ['sampleData']),
    ...mapMutations('form', ['setStep', 'updateBusiness', 'updatePrimaryContact', 'updateCovidContact', 'updateLocation']),
    async submit() {
      if(this.$refs.form.validate()) {
        this.setStep(3);
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector('.v-messages.error--text:first-of-type');
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    }
  },
  mounted() {
    if(!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  h4:not(.heading-field-label) {
    padding-bottom: 1em;
  }
  hr {
    margin-bottom: 1.75em;
    margin-top: 0.5em;
  }
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>
