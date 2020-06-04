<template>
  <v-row>
    <v-col cols="12" sm="8" lg="10">
      <h1>{{ business.name }}</h1>
      <h4 class="heading-detail">
        Submitted:
        <span>{{ createdAtDisplay }}</span>
      </h4>
      <h4 class="heading-detail">
        Confirmation ID:
        <span>{{ ipcPlan.ipcPlanId ? ipcPlan.ipcPlanId.split('-')[0].toUpperCase() : '' }}</span>
      </h4>
      <h4 class="heading-detail">
        Operation Dates:
        <span>{{ location.startDate }} - {{ location.endDate }}</span>
      </h4>
    </v-col>
    <v-col cols="12" sm="4" lg="2" class="text-sm-right">
      <GeneratePdfButton :ipcPlanId="ipcPlan.ipcPlanId">
        <v-btn text small color="textLink" class="pl-0">
          <v-icon class="mr-1">picture_as_pdf</v-icon>Download PDF
        </v-btn>
      </GeneratePdfButton>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SubmissionHeader'
};
</script>
