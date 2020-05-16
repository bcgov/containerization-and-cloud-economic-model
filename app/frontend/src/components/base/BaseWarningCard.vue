<template>
  <v-card outlined>
    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="1">
            <h1>
              <v-icon large>warning</v-icon>
            </h1>
          </v-col>
          <v-col cols="12" sm="11">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  background-color: #fcba19;
  .v-icon {
    color: black !important;
  }
}
</style>
