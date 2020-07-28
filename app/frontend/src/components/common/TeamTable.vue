<template>
  <v-container>
    <!-- table alert -->
    <v-alert v-if="alertShow" :type="alertType" tile dense>{{ alertMessage }}</v-alert>

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

    <!-- table header -->
    <v-data-table
      class="team-table"
      :headers="headers"
      item-key="id"
      :items="users"
      :search="search"
      :loading="loading"
      loading-text="Loading... Please wait"
      :options="options"
    >
      <template v-slot:item.newRole="{ item }">
        <v-select
          v-model="selection[item.id]"
          @change="updateUserRole(item.id)"
          dense
          :disabled="loading"
          :items="selectableRoleNames(item.currentRole)"
        />
      </template>
    </v-data-table>

    <v-list disabled>
      <h3 class="pb-4">Roles</h3>
      <v-list-item-group>
        <v-list-item v-for="role in roles" :key="role.id">
          <v-list-item-content>
            <v-list-item-title v-text="role.name"></v-list-item-title>
            <v-list-item-subtitle v-text="role.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import commonFormService from '@/services/commonFormService';

const NOROLE = 'No Access';

export default {
  name: 'TeamTable',
  data: () => ({
    headers: [
      { text: 'Username', align: 'start', value: 'username' },
      { text: 'Name', align: 'start', value: 'fullname' },
      { text: 'Email', align: 'start', value: 'email' },
      { text: 'Current Role', align: 'start', value: 'currentRole' },
      {
        text: 'New Role',
        align: 'end',
        value: 'newRole',
        filterable: false,
        sortable: false
      }
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
    selection: {},
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
    resetTableAlert() {
      this.alertMessage = '';
      this.alertShow = false;
      this.alertType = null;
    },
    selectableRoleNames(currentRole) {
      const selectable = this.roles
        .filter(role => role.name !== 'Request Access')
        .filter(role => role.name !== currentRole)
        .map(role => role.name);
      selectable.push(NOROLE);
      return selectable;
    },
    showTableAlert(type, msg) {
      this.alertMessage = msg;
      this.alertShow = true;
      this.alertType = type;
      this.loading = false;
    },
    async updateUserRole(userId) {
      try {
        this.resetTableAlert();

        const user = this.users.find(u => u.id === userId);
        const roleArray =
          this.selection[userId] !== NOROLE
            ? [this.roles.find(r => r.name === this.selection[userId])]
            : [];

        // Short circuit if selection is somehow the same as current role
        if (this.selection[userId] !== user.currentRole) {
          // Update User Roles
          this.loading = true;
          const response = await commonFormService.updateTeamUserRole(
            this.formName,
            userId,
            roleArray
          );
          const data = response.data;

          // Integrity Check
          if (
            (data.length && this.selection[userId] === NOROLE) ||
            (data.length === 1 && data[0].name !== this.selection[userId])
          ) {
            throw new Error(
              'Integrity failure: requested roles do not match response'
            );
          }

          // Update Table Contents
          user.currentRole = data.length === 1 ? data[0].name : NOROLE;
          this.showTableAlert(
            'success',
            `User ${user.fullname} (${user.email}) has been updated to ${user.currentRole} role`
          );
        }

        delete this.selection[userId];
      } catch (error) {
        console.error(`Error updating user roles: ${error}`); // eslint-disable-line no-console
        this.showTableAlert('error', 'Failed to update user roles');
      }
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
