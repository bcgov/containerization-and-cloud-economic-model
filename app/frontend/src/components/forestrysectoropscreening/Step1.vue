<template>
  <v-container>
    <div class="hide-on-review">
      <v-btn
        v-if="showTestDataButton"
        class="mb-5"
        outlined
        color="primary"
        @click="sampleData"
        data-test="btn-form-test-data"
      >
        <span>FOR TEST ONLY - FILL SAMPLE DATA</span>
      </v-btn>

      <BaseHeaderSection :text="'Provide the following information'" />
    </div>

    <v-form ref="form" v-model="step1Valid" class="mt-6">
      <BaseHeaderSub :text="'Business Information'" />

      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <label>Registered Business Name</label>
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
              data-test="text-form-businessName"
              :rules="businessNameRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <label>Business Address line 1</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressLine1"
              data-test="text-form-businessAddressLine1"
              :rules="businessAddressLine1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <label>Business Address line 2 (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressLine2"
              data-test="text-form-businessAddressLine2"
              :rules="businessAddressLine2Rules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <label>City</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressCity"
              data-test="text-form-businessAddressCity"
              :rules="businessAddressCityRules"
            />
          </v-col>

          <v-col cols="12" sm="3">
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
              data-test="select-form-businessAddressProvince"
              :rules="businessAddressProvinceRules"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <label>Postal Code</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="businessAddressPostalCode"
              data-test="text-form-businessAddressPostalCode"
              :rules="businessAddressPostalCodeRules"
            />
          </v-col>
        </v-row>
      </v-container>

      <BaseHeaderSub :text="'Primary Contact'" />

      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <label>First Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="firstName"
              data-test="text-form-firstName"
              :rules="firstNameRules"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <label>Last Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="lastName"
              data-test="text-form-lastName"
              :rules="lastNameRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
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
              data-test="text-form-phone1"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="phone2"
              data-test="text-form-phone2"
              :rules="phone2Rules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
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
              data-test="text-form-email"
            />
          </v-col>
        </v-row>
      </v-container>

      <BaseHeaderSub :text="'COVID-19 Coordinator'" />

      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <label>First Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidFirstName"
              data-test="text-form-covidFirstName"
              :rules="covidFirstNameRules"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <label>Last Name</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="covidLastName"
              data-test="text-form-covidLastName"
              :rules="covidLastNameRules"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <label>Phone Number</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone1"
              data-test="text-form-covidPhone1"
              :rules="covidPhone1Rules"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <label>Alternative Phone Number (Optional)</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              placeholder="000-000-0000"
              prepend-inner-icon="phone"
              v-model="covidPhone2"
              data-test="text-form-covidPhone2"
              :rules="covidPhone2Rules"
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
              data-test="text-form-covidEmail"
              :rules="covidEmailRules"
            />
          </v-col>
        </v-row>
      </v-container>

      <BaseHeaderSub :text="'Operation Details'" />

      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-menu
              v-model="startDateMenu"
              data-test="menu-form-startDate"
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
                  data-test="text-form-startDate"
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
                data-test="picker-form-startDate"
                @input="startDateMenu = false"
                :readonly="reviewMode"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6">
            <v-menu
              v-model="endDateMenu"
              data-test="menu-form-endDate"
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
                  data-test="text-form-endDate"
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
              <v-date-picker
                v-model="endDate"
                data-test="picker-form-endDate"
                @input="endDateMenu = false"
                :readonly="reviewMode"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
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
              data-test="text-form-locationCity"
              :rules="locationCityRules"
            />
            <v-text-field v-model="cityLatitude" data-test="text-form-cityLatitude" class="d-none" />
            <v-text-field
              v-model="cityLongitude"
              data-test="text-form-cityLongitude"
              class="d-none"
            />
          </v-col>

          <v-col cols="12" sm="4" lg="3">
            <label>Number of workers at this location</label>
            <v-text-field
              v-model="numberOfWorkers"
              data-test="text-form-numberOfWorkers"
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

        <hr />

        <h3 class="mt-6 mb-2">Name of Licencee(s)</h3>
        <v-row>
          <v-col cols="12">
            <label>Provide the name or names of the licencee(s) that you are conducting the work for</label>
            <v-text-field
              dense
              flat
              outlined
              solo
              v-model="licencees"
              data-test="text-form-licencees"
              :rules="licenceesRules"
            />
          </v-col>
        </v-row>

        <hr />

        <h3>Type of accommodations provided by employers for workers at this location (check all that apply)</h3>

        <v-checkbox
          v-model="accTents"
          data-test="cb-form-accTents"
          :readonly="reviewMode"
          label="Tent or trailer sites"
        ></v-checkbox>

        <div v-if="accTents">
          <v-row>
            <v-col cols="12">
              <label>
                Details (eg:
                <em>"1km from HWY 1 at 100 mile house north on Logging Road"</em>)
              </label>
              <v-textarea
                v-model="tentDetails"
                data-test="text-form-tentDetails"
                :rules="tentDetailsRules"
                auto-grow
                rows="1"
                dense
                flat
                outlined
                solo
              />
            </v-col>
          </v-row>
        </div>

        <v-checkbox
          v-model="accMotel"
          data-test="cb-form-accMotel"
          :readonly="reviewMode"
          label="Worker's lodging location (Motel, hotel, or other lodging)"
        ></v-checkbox>
        <div v-if="accMotel">
          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Name</label>
              <v-text-field
                v-model="motelName"
                data-test="text-form-motelName"
                :rules="motelNameRules"
                dense
                flat
                outlined
                solo
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>Address line 1</label>
              <v-text-field
                v-model="motelAddressLine1"
                data-test="text-form-motelAddressLine1"
                :rules="motelAddressLine1Rules"
                dense
                flat
                outlined
                solo
              />
            </v-col>

            <v-col cols="12" sm="6" lg="5">
              <label>Address line 2 (Optional)</label>
              <v-text-field
                v-model="motelAddressLine2"
                data-test="text-form-motelAddressLine2"
                :rules="motelAddressLine2Rules"
                dense
                flat
                outlined
                solo
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" lg="5">
              <label>City</label>
              <v-text-field
                v-model="motelCity"
                data-test="text-form-motelCity"
                :rules="motelCityRules"
                dense
                flat
                outlined
                solo
              />
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
                data-test="select-form-motelProvince"
                :items="provinces"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="3" lg="2">
              <label>Postal Code</label>
              <v-text-field
                v-model="motelPostalCode"
                data-test="text-form-motelPostalCode"
                :rules="motelPostalCodeRules"
                dense
                flat
                outlined
                solo
              />
            </v-col>
          </v-row>
        </div>

        <v-checkbox
          v-model="accWorkersHome"
          data-test="cb-form-accWorkersHome"
          :readonly="reviewMode"
          label="Worker's home in community"
        ></v-checkbox>
      </v-container>
    </v-form>

    <div class="hide-on-review">
      <v-btn color="primary" @click="submit" data-test="btn-form-to-next-step">
        <span>Go to Step 2</span>
      </v-btn>
      <v-btn text @click="setStep(0)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import validator from 'validator';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import CityLookup from '@/components/common/CityLookup.vue';
import OrgBookSearch from '@/components/common/OrgBookSearch.vue';
import Vue from 'vue';

export default {
  name: 'ForestrySectorStep1',
  props: {
    reviewMode: Boolean
  },
  components: {
    CityLookup,
    OrgBookSearch
  },
  data() {
    return {
      step1Valid: false,
      validationFailed: false,
      startDateMenu: false,
      endDateMenu: false,
      showTestDataButton: Vue.prototype.$config
        ? Vue.prototype.$config.env !== 'prod'
        : false,

      // Todo: constants file
      provinces: [
        'AB',
        'BC',
        'MB',
        'NB',
        'NL',
        'NS',
        'NT',
        'NU',
        'ON',
        'PE',
        'QC',
        'SK',
        'YT'
      ],

      // Business
      businessNameRules: [
        v => !!v || 'Business name is required',
        v =>
          (v && v.length <= 255) ||
          'Business name must be 255 characters or less'
      ],
      businessAddressLine1Rules: [
        v => !!v || 'Business address is required',
        v => (v && v.length <= 255) || 'Line 1 must be 255 characters or less'
      ],
      businessAddressLine2Rules: [
        v => !v || v.length <= 255 || 'Line 2 must be 255 characters or less'
      ],
      businessAddressCityRules: [
        v => !!v || 'City is required',
        v => (v && v.length <= 255) || 'City must be 255 characters or less'
      ],
      businessAddressProvinceRules: [v => !!v || 'Province is required'],
      businessAddressPostalCodeRules: [
        v => !!v || 'Postal Code is required',
        v => (v && v.length <= 7) || 'Please enter a valid postal code'
      ],

      // Contact
      firstNameRules: [
        v => !!v || 'First name is required',
        v =>
          (v && v.length <= 255) || 'First name must be 255 characters or less'
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v =>
          (v && v.length <= 255) || 'Last name must be 255 characters or less'
      ],
      phone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
        v =>
          (v && v.length <= 30) || 'Phone number must be 30 characters or less'
      ],
      phone2Rules: [
        v => validator.isMobilePhone(v) || 'invalid phone number format',
        v =>
          !v || v.length <= 30 || 'Phone number must be 30 characters or less'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          validator.isEmail(v, { allow_display_name: true }) ||
          'invalid e-mail format',
        v => (v && v.length <= 255) || 'E-mail must be 255 characters or less'
      ],

      // Covid Contact
      covidFirstNameRules: [
        v => !!v || 'First name is required',
        v =>
          (v && v.length <= 255) || 'First name must be 255 characters or less'
      ],
      covidLastNameRules: [
        v => !!v || 'Last name is required',
        v =>
          (v && v.length <= 255) || 'Last name must be 255 characters or less'
      ],
      covidPhone1Rules: [
        v => !!v || 'Phone number is required',
        v => validator.isMobilePhone(v) || 'invalid phone number format',
        v =>
          (v && v.length <= 30) || 'Phone number must be 30 characters or less'
      ],
      covidPhone2Rules: [
        v => validator.isMobilePhone(v) || 'invalid phone number format',
        v =>
          !v || v.length <= 30 || 'Phone number must be 30 characters or less'
      ],
      covidEmailRules: [
        v => !!v || 'E-mail is required',
        v =>
          validator.isEmail(v, { allow_display_name: true }) ||
          'invalid e-mail format',
        v => (v && v.length <= 255) || 'E-mail must be 255 characters or less'
      ],

      // Location
      startDateRules: [v => !!v || 'Start date is required'],
      endDateRules: [v => !!v || 'End date is required'],
      locationCityRules: [
        v => !!v || 'Closest Community / Town / City is required',
        v => (v && v.length <= 255) || 'City must be 255 characters or less'
      ],
      // Todo, put in some utility fxn somewhere if needed again
      numberOfWorkersRules: [
        v => new RegExp('^[-+]?\\d+$').test(v) || 'invalid # of workers',
        v => v > 0 || '# of workers must be greater than 0',
        v => v < 9999 || '# of workers must 9999 or less'
      ],
      licenceesRules: [v => !!v || 'Name of licencee(s) required'],
      tentDetailsRules: [
        v => !v || v.length <= 255 || 'Details must be 255 characters or less'
      ],
      motelNameRules: [
        v => !v || v.length <= 255 || 'Name must be 255 characters or less'
      ],
      motelAddressLine1Rules: [
        v => !v || v.length <= 255 || 'Address must be 255 characters or less'
      ],
      motelAddressLine2Rules: [
        v => !v || v.length <= 255 || 'Address must be 255 characters or less'
      ],
      motelCityRules: [
        v => !v || v.length <= 255 || 'City must be 255 characters or less'
      ],
      motelPostalCodeRules: [
        v => !v || v.length <= 7 || ' enter a valid postal code'
      ]
    };
  },
  computed: {
    ...mapGetters('forestrySectorOpScreeningForm', [
      'business',
      'primaryContact',
      'covidContact',
      'location'
    ]),

    // Business
    businessName: {
      get() {
        return this.business.name;
      },
      set(value) {
        this.updateBusiness({ ['name']: value });
      }
    },
    businessAddressLine1: {
      get() {
        return this.business.addressLine1;
      },
      set(value) {
        this.updateBusiness({ ['addressLine1']: value });
      }
    },
    businessAddressLine2: {
      get() {
        return this.business.addressLine2;
      },
      set(value) {
        this.updateBusiness({ ['addressLine2']: value });
      }
    },
    businessAddressCity: {
      get() {
        return this.business.city;
      },
      set(value) {
        this.updateBusiness({ ['city']: value });
      }
    },
    businessAddressProvince: {
      get() {
        return this.business.province;
      },
      set(value) {
        this.updateBusiness({ ['province']: value });
      }
    },
    businessAddressPostalCode: {
      get() {
        return this.business.postalCode;
      },
      set(value) {
        this.updateBusiness({ ['postalCode']: value });
      }
    },

    // Contact
    firstName: {
      get() {
        return this.primaryContact.firstName;
      },
      set(value) {
        this.updatePrimaryContact({ ['firstName']: value });
      }
    },
    lastName: {
      get() {
        return this.primaryContact.lastName;
      },
      set(value) {
        this.updatePrimaryContact({ ['lastName']: value });
      }
    },
    phone1: {
      get() {
        return this.primaryContact.phone1;
      },
      set(value) {
        this.updatePrimaryContact({ ['phone1']: value });
      }
    },
    phone2: {
      get() {
        return this.primaryContact.phone2;
      },
      set(value) {
        this.updatePrimaryContact({ ['phone2']: value });
      }
    },
    email: {
      get() {
        return this.primaryContact.email;
      },
      set(value) {
        this.updatePrimaryContact({ ['email']: value });
      }
    },

    // COVID Coordinator
    covidFirstName: {
      get() {
        return this.covidContact.firstName;
      },
      set(value) {
        this.updateCovidContact({ ['firstName']: value });
      }
    },
    covidLastName: {
      get() {
        return this.covidContact.lastName;
      },
      set(value) {
        this.updateCovidContact({ ['lastName']: value });
      }
    },
    covidPhone1: {
      get() {
        return this.covidContact.phone1;
      },
      set(value) {
        this.updateCovidContact({ ['phone1']: value });
      }
    },
    covidPhone2: {
      get() {
        return this.covidContact.phone2;
      },
      set(value) {
        this.updateCovidContact({ ['phone2']: value });
      }
    },
    covidEmail: {
      get() {
        return this.covidContact.email;
      },
      set(value) {
        this.updateCovidContact({ ['email']: value });
      }
    },

    // Location
    startDate: {
      get() {
        return this.location.startDate;
      },
      set(value) {
        this.updateLocation({ ['startDate']: value });
      }
    },
    endDate: {
      get() {
        return this.location.endDate;
      },
      set(value) {
        this.updateLocation({ ['endDate']: value });
      }
    },
    locationCity: {
      get() {
        return this.location.city;
      },
      set(value) {
        this.updateLocation({ ['city']: value });
      }
    },
    cityLatitude: {
      get() {
        return this.location.cityLatitude;
      },
      set(value) {
        this.updateLocation({ ['cityLatitude']: value });
      }
    },
    cityLongitude: {
      get() {
        return this.location.cityLongitude;
      },
      set(value) {
        this.updateLocation({ ['cityLongitude']: value });
      }
    },
    numberOfWorkers: {
      get() {
        return this.location.numberOfWorkers
          ? this.location.numberOfWorkers.toString()
          : '';
      },
      set(value) {
        this.updateLocation({
          ['numberOfWorkers']: Number.isNaN(value) ? 0 : Number.parseInt(value)
        });
      }
    },
    licencees: {
      get() {
        return this.location.licencees;
      },
      set(value) {
        this.updateLocation({ ['licencees']: value });
      }
    },
    accTents: {
      get() {
        return this.location.accTents;
      },
      set(value) {
        this.updateLocation({ ['accTents']: value });
      }
    },
    tentDetails: {
      get() {
        return this.location.tentDetails;
      },
      set(value) {
        this.updateLocation({ ['tentDetails']: value });
      }
    },
    accMotel: {
      get() {
        return this.location.accMotel;
      },
      set(value) {
        this.updateLocation({ ['accMotel']: value });
      }
    },
    motelName: {
      get() {
        return this.location.motelName;
      },
      set(value) {
        this.updateLocation({ ['motelName']: value });
      }
    },
    motelAddressLine1: {
      get() {
        return this.location.motelAddressLine1;
      },
      set(value) {
        this.updateLocation({ ['motelAddressLine1']: value });
      }
    },
    motelAddressLine2: {
      get() {
        return this.location.motelAddressLine2;
      },
      set(value) {
        this.updateLocation({ ['motelAddressLine2']: value });
      }
    },
    motelCity: {
      get() {
        return this.location.motelCity;
      },
      set(value) {
        this.updateLocation({ ['motelCity']: value });
      }
    },
    motelProvince: {
      get() {
        return this.location.motelProvince;
      },
      set(value) {
        this.updateLocation({ ['motelProvince']: value });
      }
    },
    motelPostalCode: {
      get() {
        return this.location.motelPostalCode;
      },
      set(value) {
        this.updateLocation({ ['motelPostalCode']: value });
      }
    },
    accWorkersHome: {
      get() {
        return this.location.accWorkersHome;
      },
      set(value) {
        this.updateLocation({ ['accWorkersHome']: value });
      }
    }
  },
  methods: {
    ...mapActions('forestrySectorOpScreeningForm', ['sampleData']),
    ...mapMutations('forestrySectorOpScreeningForm', [
      'setStep',
      'updateBusiness',
      'updatePrimaryContact',
      'updateCovidContact',
      'updateLocation'
    ]),
    async submit() {
      if (this.$refs.form.validate()) {
        this.setStep(2);
      } else {
        await new Promise(r => setTimeout(r, 200)); //ugh
        const el = document.querySelector(
          '.v-messages.error--text:first-of-type'
        );
        el.scrollIntoView(true);
        window.scrollBy(0, -60); // ugh again
      }
    }
  },
  mounted() {
    if (!this.reviewMode) {
      // Once they've gotten to the form start (step 2) enable the typical "leave site" native browser warning
      // This gets disabled after form submit in step 6
      window.onbeforeunload = () => true;
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  .row {
    div[class^='col-'],
    div[class*=' col-'] {
      padding-bottom: 0;
      padding-top: 0;
    }
  }
}
</style>
