<template>
  <div>
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <label>Update Status</label>
    <v-select
      block
      dense
      flat
      outlined
      solo
      single-line
      label="Select status to set"
      :items="items"
      item-text="label"
      item-value="statusVal"
      v-model="statusToSet"
      @change="statusCard = true"
    />

    <div v-show="statusCard">
      <div v-if="statusToSet === statuses.SCHEDULED">
        <label>Inspection Date</label>
        <v-menu
          v-model="inspectionDateMenu"
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="inspectionDate"
              placeholder="yyyy-mm-dd"
              append-icon="event"
              v-on:click:append="inspectionDateMenu=true"
              readonly
              v-on="on"
              dense
              flat
              outlined
              solo
            ></v-text-field>
          </template>
          <v-date-picker v-model="inspectionDate" @input="inspectionDateMenu = false"></v-date-picker>
        </v-menu>
      </div>

      <label>Inspector Name</label>
      <v-text-field v-model="inspectorName" dense flat outlined solo />

      <label>Inspector Email (Optional)</label>
      <v-text-field v-model="inspectorEmail" dense flat outlined solo />

      <div v-if="statusToSet === statuses.ASSIGNED" class="text-right">
        <v-btn text small color="primary" class="pl-0 my-0 text-end" @click="assignToCurrentUser">
          <v-icon class="mr-1">person</v-icon>ASSIGN TO ME
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { Statuses } from '@/utils/constants';

export default {
  name: 'Status',
  props: {
    ipcPlanId: {
      required: true,
      type: String
    },
    label: {
      required: false,
      type: String
    },
    existingStatusObj: {
      required: true,
      type: Object
    },
    primary: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      error: '',
      inspectionDateMenu: false,
      statusCard: false,
      statuses: Statuses,
      statusToSet: '',

      // Fields
      inspectorName: this.existingStatusObj ? this.existingStatusObj.inspectorName : '',
      inspectorEmail: this.existingStatusObj ? this.existingStatusObj.inspectorEmail : '',
      inspectionDate: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['email', 'fullName']),

  },
  methods: {
  },
  mounted() {
  }
};
</script>
