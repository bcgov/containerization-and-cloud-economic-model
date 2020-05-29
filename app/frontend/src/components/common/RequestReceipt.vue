<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="primary"
          :disabled="success"
          fab
          large
          v-on:click="displayDialog()"
        >
          <v-icon v-if="success">check</v-icon>
          <v-icon v-else>email</v-icon>
        </v-btn>

        <BaseDialog
          :show="showDialog"
          type="CONTINUE"
          @close-dialog="showDialog = false"
          @continue-dialog="requestReceipt()"
        >
          <template v-slot:icon>
            <v-icon large color="primary">email</v-icon>
          </template>
          <template v-slot:text>
            <v-form ref="form" v-model="valid" @submit="requestReceipt()" @submit.prevent>
              <label>Send to E-mail Address</label>
              <v-text-field
                dense
                flat
                outlined
                solo
                :rules="emailRules"
                prepend-inner-icon="email"
                v-model="to"
              />
            </v-form>
          </template>
          <template v-slot:button-text-continue>
            <span>SEND</span>
          </template>
        </BaseDialog>

        <BaseDialog :show="resultDialog" @close-dialog="resultDialog = false">
          <template v-slot:icon>
            <v-icon v-if="success" large color="success">check_circle_outline</v-icon>
            <v-icon v-else large color="error">cancel</v-icon>
          </template>
          <template v-slot:text>{{ resultDialogMsg }}</template>
        </BaseDialog>
      </template>
      <span>Email Receipt</span>
    </v-tooltip>
  </div>
</template>

<script>
import validator from 'validator';

import commonFormService from '@/services/commonFormService';

export default {
  name: 'RequestReceipt',
  computed: {
    formName() {
      return this.$route.path.split('/')[1];
    }
  },
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        validator.isEmail(v, { allow_display_name: true }) ||
        'invalid e-mail format'
    ],
    resultDialog: false,
    resultDialogMsg: '',
    showDialog: false,
    success: false,
    to: '',
    valid: false
  }),
  methods: {
    displayDialog() {
      this.showDialog = true;
    },
    requestReceipt() {
      if (this.valid) {
        commonFormService
          .requestReceiptEmail(this.formName, {
            submissionId: this.submissionId,
            to: this.to
          })
          .then(() => {
            this.success = true;
            this.resultDialogMsg = `An email has been sent to ${this.to}.`;
          })
          .catch(() => {
            this.success = false;
            this.resultDialogMsg =
              'An error occured while attempting to send your email.';
          })
          .finally(() => {
            this.showDialog = false;
            this.resultDialog = true;
          });
      }
    },
    resetDialog() {
      this.resultDialogMsg = '';
      this.success = false;
      this.to = this.email;
      this.valid = false;
    }
  },
  mounted() {
    this.resetDialog();
  },
  props: {
    email: {
      type: String,
      required: true
    },
    submissionId: {
      type: String,
      required: true
    }
  }
};
</script>
