<template>
  <div>
    <!-- search input -->
    <div class="team-search mt-6 mt-sm-0">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="pb-5"
      />
    </div>
    <!-- table alert -->
    <v-alert v-if="showAlert" :type="alertType" tile dense>{{ alertMessage }}</v-alert>
    <!-- table header -->
    <v-data-table
      class="team-table"
      :headers="headers"
      :items="submissions"
      :items-per-page="10"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="confirmationId"
    >
      <template v-slot:item.newRole="{ item }">
        Dropdown TBD {{ item }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'TeamTable',
  computed: {
    formName() {
      return this.$route.path.split('/')[1];
    }
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Username', align: 'start', value: 'username' },
      { text: 'Name', align: 'start', value: 'fullname' },
      { text: 'Email', align: 'start', value: 'email' },
      { text: 'Current Role', align: 'start', value: 'currentRole' },
      { text: 'New Role', value: 'newRole', sortable: false }
    ],
    roles: [],
    users: [],
    loading: true,
    showAlert: false,
    alertType: null,
    alertMessage: ''
  }),
  methods: {
    getData() {
      this.loading = false;
    },
    showTableAlert(type, msg) {
      this.showAlert = true;
      this.alertType = type;
      this.alertMessage = msg;
      this.loading = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.team-search {
  width: 100%;
}
@media (min-width: 600px) {
  .team-search {
    max-width: 20em;
    float: right;
  }
}
@media (max-width: 599px) {
  .team-search {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.team-table {
  clear: both;
}
@media (max-width: 1263px) {
  .team-table >>> th {
    vertical-align: top;
  }
}

.team-table >>> tbody tr:nth-of-type(odd) {
  background-color: #f5f5f5;
}
.team-table >>> thead tr th {
  font-weight: normal;
  color: #003366 !important;
  font-size: 1.1em;
}
</style>
