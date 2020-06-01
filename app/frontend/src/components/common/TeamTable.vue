<template>
  <v-container>
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
    <v-alert v-if="alertShow" :type="alertType" tile dense>{{ alertMessage }}</v-alert>
    <!-- table header -->
    <v-data-table
      class="team-table"
      :headers="headers"
      item-key="id"
      :items="users"
      must-sort
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :options="options"
    >
      <template v-slot:item.username="{ item }">
        <v-tooltip bottom>
          <span>{{ item.id }}</span>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ item.username }}</span>
          </template>
        </v-tooltip>
      </template>
      <template v-slot:item.newRole>Dropdown TBD</template>
    </v-data-table>
  </v-container>
</template>

<script>
import commonFormService from '@/services/commonFormService';

export default {
  name: 'TeamTable',
  data: () => ({
    headers: [
      { text: 'Username', align: 'start', value: 'username' },
      { text: 'Name', align: 'start', value: 'fullname' },
      { text: 'Email', align: 'start', value: 'email' },
      { text: 'Current Role', align: 'start', value: 'currentRole' },
      { text: 'New Role', align: 'end', value: 'newRole', sortable: false }
    ],
    alertMessage: '',
    alertShow: false,
    alertType: null,
    loading: true,
    options: {
      sortBy: ['currentRole'],
      sortDesc: [true]
    },
    roles: [],
    search: '',
    users: []
  }),
  methods: {
    async getRoles() {
      try {
        const response = await commonFormService.getTeamRoles(this.formName);
        const data = response.data;
        this.roles = data.map(role => ({
          id: role.id,
          name: role.name,
          description: role.description
        }));
      } catch (error) {
        console.error(`Error getting roles: ${error}`); // eslint-disable-line no-console
        this.showTableAlert('error', 'Failed to get roles');
      }
    },
    async getUsers() {
      try {
        const response = await commonFormService.getTeamUsers(
          this.formName,
          true
        );
        const data = response.data;
        this.users = data.map(user => ({
          id: user.id,
          username: user.username,
          fullname: `${user.firstName} ${user.lastName}`,
          email: user.email,
          currentRole: user.roles[0].name
        }));
      } catch (error) {
        console.error(`Error getting users: ${error}`); // eslint-disable-line no-console
        this.showTableAlert('error', 'Failed to get users');
      }
    },
    showTableAlert(type, msg) {
      this.showAlert = true;
      this.alertType = type;
      this.alertMessage = msg;
      this.loading = false;
    }
  },
  async mounted() {
    await Promise.all([this.getRoles(), this.getUsers()]);
    this.loading = false;
  },
  props: {
    formName: {
      type: String,
      required: true
    }
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
