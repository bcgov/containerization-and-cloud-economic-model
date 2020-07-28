<template>
  <v-container>
    <v-container fluid class="px-0">
      <v-row dense>
        <v-col v-for="form in forms.filter(f => f.enabled)" :key="form.title" cols="12" md="4" xl="2" class="my-app-card">
          <BaseActionCard :linkName="form.linkName">
            <div class="app-link">
              <h2>{{ form.title }}</h2>
              <div class="env-statuses">
                <v-skeleton-loader
                  type="list-item-three-line"
                  :loading="!moduleLoaded"
                  transition="scale-transition"
                >
                  <div>
                    <router-link class="pr-2" :to="{ name: form.linkName }">
                      <v-btn color="primary">
                        <span>VIEW</span>
                      </v-btn>
                    </router-link>
                    <router-link
                      v-if="hasResourceRoles(form.resource, form.roles)"
                      class="pr-2"
                      :to="{ name: form.linkAdminName }"
                    >
                      <v-btn outlined>
                        <span>ADMIN</span>
                      </v-btn>
                    </router-link>
                  </div>
                </v-skeleton-loader>
              </div>
            </div>
          </BaseActionCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { AppClients } from '@/utils/constants';

export default {
  name: 'FormList',
  computed: {
    ...mapGetters('auth', ['hasResourceRoles'])
  },
  data: () => ({
    // TODO: Consider loading part of this from API?
    forms: [
      {
        enabled: true,
        linkAdminName: 'AgriSeafoodOpScreeningAdmin',
        linkName: 'AgriSeafoodOpScreeningForm',
        resource: AppClients.AGRISEAFOODOPSCREENING,
        roles: [],
        title: 'Agriculture and Seafood Operator Screening'
      },
      {
        enabled: true,
        linkAdminName: 'ForestrySectorOpScreeningAdmin',
        linkName: 'ForestrySectorOpScreeningForm',
        resource: AppClients.FORESTRYSECTOROPSCREENING,
        roles: [],
        title: 'Forestry Sector Operator Screening'
      },
      {
        enabled: true,
        linkAdminName: 'MinesOperatorScreeningAdmin',
        linkName: 'MinesOperatorScreeningForm',
        resource: AppClients.MINESOPERATORSCREENING,
        roles: [],
        title: 'Mines Operator Screening'
      }
    ],
    moduleLoaded: true
  })
};
</script>

<style scoped>
.my-app-card {
  padding-right: 2rem;
  margin-bottom: 2rem;
  min-height: 9rem;
}

.app-link h2 {
  color: #38598a;
  margin-bottom: 1rem;
  font-weight: 400;
}
</style>
