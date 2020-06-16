<template>
  <v-card outlined class="mx-auto inspection-panel">
    <v-progress-linear indeterminate v-if="loading" color="primary" class="mb-2" />
    <v-alert v-if="error" type="error" tile dense>{{ error }}</v-alert>

    <h2 class="inspection-heading">Notes</h2>
    <div v-if="!loading">
      <div v-if="notes.length == 0">There are no notes on this submission yet.</div>
      <v-btn
        v-if="!showNoteField"
        text
        small
        color="primary"
        class="pl-0"
        data-test="btn-new-note"
        :disabled="!hasReviewer"
        @click="showNoteField = true"
      >
        <v-icon class="mr-1">add</v-icon>
        <span>NEW NOTE</span>
      </v-btn>

      <v-form v-if="showNoteField">
        <v-row>
          <v-col cols="12" xl="8" offset-xl="2">
            <label>Note</label>
            <v-textarea
              v-model="newNote"
              data-test="text-newNote"
              :rules="[v => v.length <= 4000 || 'Max 4000 characters']"
              counter
              auto-grow
              dense
              flat
              outlined
              solo
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" xl="4" offset-xl="2">
            <v-btn
              block
              color="primary"
              @click="showNoteField=false"
              data-test="btn-cancel-note"
              outlined
            >
              <span>Cancel</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" xl="4" order="first" order-sm="last">
            <v-btn
              block
              color="primary"
              data-test="btn-add-note"
              :disabled="!newNote || !hasReviewer"
              @click="addNote"
            >
              <span>ADD NOTE</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <ul class="mt-5">
        <li class="mb-2" v-for="note in notes" v-bind:key="note.noteId">
          <strong>{{ formatDate(note.createdAt) }} - {{ formatUserName(note.createdBy) }}</strong>
          <br />
          {{note.note}}
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

import commonFormService from '@/services/commonFormService';
import { AppRoles, getAppClient } from '@/utils/constants';

export default {
  name: 'NotesPanel',
  components: {},
  props: {
    formName: {
      type: String,
      required: true
    },
    submissionId: {
      required: true,
      type: String
    }
  },
  data: () => ({
    error: '',
    loading: true,
    newNote: '',
    notes: [],
    showNoteField: false
  }),
  computed: {
    ...mapGetters('auth', ['hasResourceRoles', 'fullName']),
    hasReviewer() {
      return this.hasResourceRoles(getAppClient(this.formName), [
        AppRoles.REVIEWER
      ]);
    }
  },
  methods: {
    formatUserName(name) {
      return name ? name.replace('@idir', '') : '';
    },
    formatDate(date) {
      return moment(date).format('MMMM D YYYY, h:mm:ss a');
    },
    async getNotes() {
      this.loading = true;
      try {
        const response = await commonFormService.getNotes(
          this.formName,
          this.submissionId
        );
        this.notes = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    async addNote() {
      try {
        this.error = '';
        const body = {
          createdBy: this.fullName,
          note: this.newNote
        };
        const response = await commonFormService.addNote(
          this.formName,
          this.submissionId,
          body
        );
        if (!response.data) {
          throw new Error('No response data from API while submitting form');
        }
        this.showNoteField = false;
        this.newNote = '';
        this.getNotes();
      } catch (error) {
        console.error(`Error adding note: ${error}`); // eslint-disable-line no-console
        this.error = 'An error occured while trying to add the note';
      }
    }
  },
  created() {
    this.getNotes();
  }
};
</script>

<style lang="scss" scoped>
.inspection-panel {
  background-color: #f5f5f5;
  margin-bottom: 2em;
  padding: 1em 1.5em;
  .inspection-heading {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #003366;
  }
}
</style>
