package pages

import geb.Page
import geb.Module
import org.openqa.selenium.Keys

class MinesOperatorPage extends BaseAppPage {

    static at = { title == "Industrial Camps" && headerModule.headerTitle.text() == "Industrial Camps" }
    static url = "minesoperatorscreening/"
    int dataState = 0; //0=Data entry, 1=Review

    static content = {
      // Common
      nextStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-next-step"]',0) }  // This will always find the active next button, common for all pages
      previousStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-previous-step"]',0) }

      //
      // Page 1
      //

      //
      // Page 2
      //
      lowerTitle { $("h2", text:"Provide Your Business Contact Information") }

      //Business Name
      registeredBusinessName { $("input", "data-test":"text-form-orgbook-search-fieldModel") }
      firstName { $("input", "data-test":"text-form-firstName",dataState) }
      lastName { $("input", "data-test":"text-form-lastName",dataState) }
      phoNe1 { $("input", "data-test":"text-form-phone1",dataState) }
      phoNe2 { $("input", "data-test":"text-form-phone2",dataState) }
      eMail { $("input", "data-test":"text-form-email",dataState) }

      businessAddressLine1 { $("input", "data-test":"text-form-businessAddressLine1",dataState) }
      businessAddressLine2 { $("input", "data-test":"text-form-businessAddressLine2",dataState) }
      businessAddressCity { $("input", "data-test":"text-form-businessAddressCity", 0 ) }
      businessAddressProvince { $("input", "data-test":"select-form-businessAddressProvince",dataState) }
      businessAddressPostalCode { $("input", "data-test":"text-form-businessAddressPostalCode",dataState) }

      //COVID-19 Coordinator
      covidFirstName { $("input", "data-test":"text-form-covidFirstName",dataState) }
      covidLastName { $("input", "data-test":"text-form-covidLastName",dataState) }
      covidPhone1 { $("input", "data-test":"text-form-covidPhone1",dataState) }
      covidPhone2 { $("input", "data-test":"text-form-covidPhone2",dataState) }
      covidEmail { $("input", "data-test":"text-form-covidEmail",dataState) }

      //Provide your accommodation details
      basestartDate { $("input", "data-test":"text-form-startDate",dataState) }
      startDate { basestartDate.parentsUntil("div", class:"v-input__slot") }
      baseendDate { $("input", "data-test":"text-form-endDate",dataState) }
      endDate { baseendDate.parentsUntil("div", class:"v-input__slot") }
      closestCity { $("input", placeholder:"Start typing to search for cities in BC",dataState) }
      numberOfWorkers { $("input", "data-test":"text-form-numberOfWorkers",dataState) }
      //Hidden fields
      cityLatitude { $("input", "data-test":"text-form-cityLatitude",dataState) }
      cityLongitude { $("input", "data-test":"text-form-cityLongitude",dataState) }

      //Type of accommodation for workers at this location
      baseaccTents { $("input", type:"checkbox", "data-test":"cb-form-accTents",dataState) }
      accTents { baseaccTents.parentsUntil("div", class:"v-input__slot") } //For clicking as the clicks are captured by the parents and not this element.
      tentDetails { $("input", "data-test":"text-form-tentDetails",dataState) }

      baseaccMotel { $("input", type:"checkbox", "data-test":"cb-form-accMotel",dataState) }
      accMotel { baseaccMotel.parentsUntil("div", class:"v-input__slot") }
      motelName { $('input', "data-test":"text-form-motelName",dataState) }
      motelAddressLine1 { $('input', "data-test":"text-form-motelAddressLine1",dataState) }
      motelAddressLine2 { $('input', "data-test":"text-form-motelAddressLine2",dataState) }
      motelCity { $('input', "data-test":"text-form-motelCity",dataState) }
      motelProvince { $('input', "data-test":"select-form-motelProvince",dataState) }
      motelPostalCode { $('input', "data-test":"text-form-motelPostalCode",dataState) }

      baseaccWorkersHome { $('input', type:"checkbox", "data-test":"cb-form-accWorkersHome",dataState) }
      accWorkersHome { baseaccWorkersHome.parentsUntil("div", class:"v-input__slot") }

      //Authorization Information
      mineNumber {$("input", "data-test":"text-form-mineNumber",dataState) }
      permitNumber { $("input", "data-test":"text-form-permitNumber",dataState) }

      //Page 3
      lowerTitlePg3 { $("h2", class:"pb-8", text:"Before operations begin, please check all that apply") }

      //COVID-19 Information
      protectionSignage { $("input", type:"checkbox","data-test":"cb-form-protectionSignage",dataState) }
      workerContactPersonnel { $("input", type:"checkbox", "data-test":"cb-form-workerContactPersonnel",dataState) }

      //Provide safe lodging and accommodation: General Worker
      commonAreaYes { $("input", type:"radio", 0) }
      commonAreaNo { $("input", type:"radio", 1) }

      bedSituationInd { $("input", type:"radio", 2) }
      bedSituationShare { $("input", type:"radio", 3) }
      sharedSleepingPerRoom { $("input", type:"text", "data-test":"select-form-sharedSleepingPerRoom",dataState) }
      sharedSleepingDistancing { $("input", type:"checkbox", "data-test":"cb-form-sharedSleepingDistancing",dataState) }

      //Self-isolation space if a worker comes down with COVID-19-like symptoms
      selfIsolateUnderstood { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateUnderstood",dataState) }
      selfIsolateAccommodation { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateAccommodation",dataState) }

      //Make sure laundry services are available and handled safely
      laundryServices { $("input", type:"checkbox", "data-test":"cb-form-laundryServices",dataState) }

      //Practicing waste management: At work-site and accommodation
      wasteManagementGloves { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementGloves",dataState) }
      wasteManagementSchedule { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementSchedule",dataState) }
      wasteManagementBags { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementBags",dataState) }

      //Have proper hand-washing facilities: At work-site and accommodation
      handWashingStations { $("input", type:"checkbox", "data-test":"cb-form-handWashingStations",dataState) }
      handWashingSoapWater { $("input", type:"checkbox", "data-test":"cb-form-handWashingSoapWater",dataState) }
      handWashingWaterless { $("input", type:"checkbox", "data-test":"cb-form-handWashingWaterless",dataState) }
      handWashingPaperTowels { $("input", type:"checkbox", "data-test":"cb-form-handWashingPaperTowels",dataState) }
      handWashingSignage { $("input", type:"checkbox", "data-test":"cb-form-handWashingSignage",dataState) }

      //Physical Distancing Practices
      distancingMaintained { $("input", type:"checkbox", "data-test":"cb-form-distancingMaintained",dataState) }
      distancingFaceShields { $("input", type:"checkbox", "data-test":"cb-form-distancingFaceShields",dataState) }

      //Have a Cleaning and Disinfecting Schedule
      disinfectingSchedule { $("input", type:"checkbox", "data-test":"cb-form-disinfectingSchedule",dataState) }

      //Transportation of Workers
      transportationSingleOccupant { $("input", type:"checkbox", "data-test":"cb-form-transportationSingleOccupant",dataState) }
      transportationBusesVans { $("input", type:"checkbox", "data-test":"cb-form-transportationBusesVans",dataState) }
      transportationTrucksCars { $("input", type:"checkbox", "data-test":"cb-form-transportationTrucksCars",dataState) }
      transportationHelicopter { $("input", type:"checkbox", "data-test":"cb-form-transportationHelicopter",dataState) }
      transportationTravelPod { $("input", type:"checkbox", "data-test":"cb-form-transportationTravelPod",dataState) }
      transportationCleaningDistancing { $("input", type:"checkbox", "data-test":"cb-form-transportationCleaningDistancing",dataState) }

      //Implement COVID-19 Employee Education
      educationSignage { $("input", type:"checkbox", "data-test":"cb-form-educationSignage",dataState) }
      educationContactPersonnel { $("input", type:"checkbox", "data-test":"cb-form-educationContactPersonnel",dataState) }

      //Train workers on COVID-19 infection control
      trainingCovid19 { $("input", type:"checkbox", "data-test":"cb-form-trainingCovid19",dataState) }
      trainingEtiquette { $("input", type:"checkbox", "data-test":"cb-form-trainingEtiquette",dataState) }
      trainingLocations { $("input", type:"checkbox", "data-test":"cb-form-trainingLocations",dataState) }
      trainingFirstAid { $("input", type:"checkbox", "data-test":"cb-form-trainingFirstAid",dataState) }
      trainingReporting { $("input", type:"checkbox", "data-test":"cb-form-trainingReporting",dataState) }

      //Meals Preparation: Practice safe food handling
      mealsDistancing { $("input", type:"checkbox", "data-test":"cb-form-mealsDistancing",dataState) }
      mealsDishware { $("input", type:"checkbox", "data-test":"cb-form-mealsDishware",dataState) }
      mealsDishwashing { $("input", type:"checkbox", "data-test":"cb-form-mealsDishwashing",dataState) }

      //Plan to manage individuals with suspected COVID-19 Infection
      infectionSeparation { $("input", type:"checkbox", "data-test":"cb-form-infectionSeparation",dataState) }
      infectionSymptoms { $("input", type:"checkbox", "data-test":"cb-form-infectionSymptoms",dataState) }
      infectionHeathLinkBC { $("input", type:"checkbox", "data-test":"cb-form-infectionHeathLinkBC",dataState) }
      infectionSanitization { $("input", type:"checkbox", "data-test":"cb-form-infectionSanitization",dataState) }
      infectionAccommodation { $("input", type:"checkbox", "data-test":"cb-form-infectionAccommodation",dataState) }

      //Providing Food for Ill Workers
      infectedFeeding { $("input", type:"checkbox", "data-test":"cb-form-infectedFeeding",dataState) }

      //Housekeeping for Ill Workers
      infectedHousekeeping { $("input", type:"checkbox", "data-test":"cb-form-infectedHousekeeping",dataState) }

      //Waste Management for Ill Workers
      infectedWaste { $("input", type:"checkbox", "data-test":"cb-form-infectedWaste",dataState) }

      certifyAccurateInformation { $("input", type:"checkbox", "data-test":"cb-form-certifyAccurateInformation",dataState) }
      agreeToInspection { $("input", type:"checkbox", "data-test":"cb-form-agreeToInspection",dataState) }

      subMit { $("button", class: "v-btn v-btn--contained theme--light v-size--default primary", "data-test":"btn-form-submit") }

    }

    void NextStep(){
      waitFor { nextStep.displayed }
      nextStep.click()
    }
    void PreviousStep(){
      waitFor { previousStep.displayed }
      previousStep.click()
    }

    boolean setRegisteredBusinessName(String value) {
      registeredBusinessName.value(value)
      registeredBusinessName << Keys.chord(Keys.ARROW_DOWN)
      registeredBusinessName << Keys.chord(Keys.ENTER)
      registeredBusinessName << Keys.chord(Keys.TAB)
      return true
    }

    boolean setFirstName(String value) {
      firstName.value(value)
      return true
    }
    boolean setLastName(String value) {
      lastName.value(value)
      return true
    }
    boolean setPhone(String value) {
      phoNe1.value(value)
      return true
    }
    boolean setAlternativePhone(String value) {
      phoNe2.value(value)
      return true
    }
    boolean setEmail(String value) {
      eMail.value(value)
      return true
    }
    boolean setMineNumber() { //Sets a random number
      mineNumber.value(Math.abs(new Random().nextInt(999999) + 1000000))
      return true
    }
    boolean setPermitNumber() { //Sets a random number
      permitNumber.value(Math.abs(new Random().nextInt(99999) + 100000))
      return true
    }
}
