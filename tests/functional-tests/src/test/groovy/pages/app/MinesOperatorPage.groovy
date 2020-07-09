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
      lowerTitle { $("h2", text:"Provide Your Business Contact Information") }
      //Business Name
      registeredBusinessName { $("input", "data-test":"text-form-orgbook-search-fieldModel") }
      registeredBusinessNameReview { $("input", "data-test":"text-form-businessName") }
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
      protectionSignage { $("input", type:"checkbox","data-test":"cb-form-protectionSignage",dataState).parentsUntil("div", class:"v-input__slot") }
      workerContactPersonnel { $("input", type:"checkbox", "data-test":"cb-form-workerContactPersonnel",dataState).parentsUntil("div", class:"v-input__slot") }

      //Provide safe lodging and accommodation: General Worker
      commonAreaYes { $("input", type:"radio", 0) }
      commonAreaNo { $("input", type:"radio", 1) }

      bedSituationInd { $("input", type:"radio", 2) }
      bedSituationShare { $("input", type:"radio", 3) }
      sharedSleepingPerRoom { $("input", type:"text", "data-test":"select-form-sharedSleepingPerRoom",dataState) }
      sharedSleepingDistancing { $("input", type:"checkbox", "data-test":"cb-form-sharedSleepingDistancing",dataState).parentsUntil("div", class:"v-input__slot") }

      //Self-isolation space if a worker comes down with COVID-19-like symptoms
      selfIsolateUnderstood { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateUnderstood",dataState).parentsUntil("div", class:"v-input__slot") }
      selfIsolateAccommodation { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateAccommodation",dataState).parentsUntil("div", class:"v-input__slot") }

      //Make sure laundry services are available and handled safely
      laundryServices { $("input", type:"checkbox", "data-test":"cb-form-laundryServices",dataState).parentsUntil("div", class:"v-input__slot") }

      //Practicing waste management: At work-site and accommodation
      wasteManagementGloves { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementGloves",dataState).parentsUntil("div", class:"v-input__slot") }
      wasteManagementSchedule { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementSchedule",dataState).parentsUntil("div", class:"v-input__slot") }
      wasteManagementBags { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementBags",dataState).parentsUntil("div", class:"v-input__slot") }

      //Have proper hand-washing facilities: At work-site and accommodation
      handWashingStations { $("input", type:"checkbox", "data-test":"cb-form-handWashingStations",dataState).parentsUntil("div", class:"v-input__slot") }
      handWashingSoapWater { $("input", type:"checkbox", "data-test":"cb-form-handWashingSoapWater",dataState).parentsUntil("div", class:"v-input__slot") }
      handWashingWaterless { $("input", type:"checkbox", "data-test":"cb-form-handWashingWaterless",dataState).parentsUntil("div", class:"v-input__slot") }
      handWashingPaperTowels { $("input", type:"checkbox", "data-test":"cb-form-handWashingPaperTowels",dataState).parentsUntil("div", class:"v-input__slot") }
      handWashingSignage { $("input", type:"checkbox", "data-test":"cb-form-handWashingSignage",dataState).parentsUntil("div", class:"v-input__slot") }

      //Physical Distancing Practices
      distancingMaintained { $("input", type:"checkbox", "data-test":"cb-form-distancingMaintained",dataState).parentsUntil("div", class:"v-input__slot") }
      distancingFaceShields { $("input", type:"checkbox", "data-test":"cb-form-distancingFaceShields",dataState).parentsUntil("div", class:"v-input__slot") }

      //Have a Cleaning and Disinfecting Schedule
      disinfectingSchedule { $("input", type:"checkbox", "data-test":"cb-form-disinfectingSchedule",dataState).parentsUntil("div", class:"v-input__slot") }

      //Transportation of Workers
      transportationSingleOccupant { $("input", type:"checkbox", "data-test":"cb-form-transportationSingleOccupant",dataState).parentsUntil("div", class:"v-input__slot") }
      transportationBusesVans { $("input", type:"checkbox", "data-test":"cb-form-transportationBusesVans",dataState).parentsUntil("div", class:"v-input__slot") }
      transportationTrucksCars { $("input", type:"checkbox", "data-test":"cb-form-transportationTrucksCars",dataState).parentsUntil("div", class:"v-input__slot") }
      transportationHelicopter { $("input", type:"checkbox", "data-test":"cb-form-transportationHelicopter",dataState).parentsUntil("div", class:"v-input__slot") }
      transportationTravelPod { $("input", type:"checkbox", "data-test":"cb-form-transportationTravelPod",dataState).parentsUntil("div", class:"v-input__slot") }
      basetransportationCleaningDistancing { $("input", type:"checkbox", "data-test":"cb-form-transportationCleaningDistancing",dataState) }
      transportationCleaningDistancing { basetransportationCleaningDistancing.parentsUntil("div", class:"v-input__slot") }

      //Implement COVID-19 Employee Education
      educationSignage { $("input", type:"checkbox", "data-test":"cb-form-educationSignage",dataState).parentsUntil("div", class:"v-input__slot") }
      educationContactPersonnel { $("input", type:"checkbox", "data-test":"cb-form-educationContactPersonnel",dataState).parentsUntil("div", class:"v-input__slot") }

      //Train workers on COVID-19 infection control
      trainingCovid19 { $("input", type:"checkbox", "data-test":"cb-form-trainingCovid19",dataState).parentsUntil("div", class:"v-input__slot") }
      trainingEtiquette { $("input", type:"checkbox", "data-test":"cb-form-trainingEtiquette",dataState).parentsUntil("div", class:"v-input__slot") }
      trainingLocations { $("input", type:"checkbox", "data-test":"cb-form-trainingLocations",dataState).parentsUntil("div", class:"v-input__slot") }
      trainingFirstAid { $("input", type:"checkbox", "data-test":"cb-form-trainingFirstAid",dataState).parentsUntil("div", class:"v-input__slot") }
      trainingReporting { $("input", type:"checkbox", "data-test":"cb-form-trainingReporting",dataState).parentsUntil("div", class:"v-input__slot") }

      //Meals Preparation: Practice safe food handling
      mealsDistancing { $("input", type:"checkbox", "data-test":"cb-form-mealsDistancing",dataState).parentsUntil("div", class:"v-input__slot") }
      mealsDishware { $("input", type:"checkbox", "data-test":"cb-form-mealsDishware",dataState).parentsUntil("div", class:"v-input__slot") }
      mealsDishwashing { $("input", type:"checkbox", "data-test":"cb-form-mealsDishwashing",dataState).parentsUntil("div", class:"v-input__slot") }

      //Plan to manage individuals with suspected COVID-19 Infection
      infectionSeparation { $("input", type:"checkbox", "data-test":"cb-form-infectionSeparation",dataState).parentsUntil("div", class:"v-input__slot") }
      infectionSymptoms { $("input", type:"checkbox", "data-test":"cb-form-infectionSymptoms",dataState).parentsUntil("div", class:"v-input__slot") }
      infectionHeathLinkBC { $("input", type:"checkbox", "data-test":"cb-form-infectionHeathLinkBC",dataState).parentsUntil("div", class:"v-input__slot") }
      infectionSanitization { $("input", type:"checkbox", "data-test":"cb-form-infectionSanitization",dataState).parentsUntil("div", class:"v-input__slot") }
      infectionAccommodation { $("input", type:"checkbox", "data-test":"cb-form-infectionAccommodation",dataState).parentsUntil("div", class:"v-input__slot") }

      //Providing Food for Ill Workers
      infectedFeeding { $("input", type:"checkbox", "data-test":"cb-form-infectedFeeding",dataState).parentsUntil("div", class:"v-input__slot") }

      //Housekeeping for Ill Workers
      infectedHousekeeping { $("input", type:"checkbox", "data-test":"cb-form-infectedHousekeeping",dataState).parentsUntil("div", class:"v-input__slot") }

      //Waste Management for Ill Workers
      infectedWaste { $("input", type:"checkbox", "data-test":"cb-form-infectedWaste",dataState).parentsUntil("div", class:"v-input__slot") }

      certifyAccurateInformation { $("input", type:"checkbox", "data-test":"cb-form-certifyAccurateInformation") }
      agreeToInspection { $("input", type:"checkbox", "data-test":"cb-form-agreeToInspection") }

      submitForm { $("button", class: "v-btn v-btn--contained theme--light v-size--default primary", "data-test":"btn-form-submit") }
      submittedTitle { $("h1", class:"pb-8", text: contains("successfully") ) }
      submitID { $("h2", class: "mb-10") }

    }

    void NextStep(){
      waitFor { nextStep.displayed }
      nextStep.click()
    }
    void PreviousStep(){
      waitFor { previousStep.displayed }
      previousStep.click()
    }

    boolean setReviewData(boolean review){
      if (review){
        dataState = 1
      }
      dataState = 0
      return true
    }

    boolean setRegisteredBusinessName(String value) {
      registeredBusinessName.value(value)
      registeredBusinessName << Keys.chord(Keys.ARROW_DOWN)
      registeredBusinessName << Keys.chord(Keys.ENTER)
      registeredBusinessName << Keys.chord(Keys.TAB)
      return true
    }

    String getRegisteredBusinessName(Integer index) {
      dataState = index
      return registeredBusinessName.value()
    }

    boolean checkregisteredBusinessName(String value) {
      if (registeredBusinessNameReview.value() == value) {
        return true
      }
      return false
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
    void selectNumberofBeds(Integer value) {
      $("div", class:"v-list-item__title", text:"$value", 0).click()
      return
    }
}
