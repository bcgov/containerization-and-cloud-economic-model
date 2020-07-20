/* Copyright 2020 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

package pages

import geb.Page
import geb.Module
import org.openqa.selenium.Keys

class AgriSeafoodOperatorPage extends BaseAppPage {

    static at = { title == "Industrial Camps" && headerModule.headerTitle.text() == "Industrial Camps" }
    static url = "minesoperatorscreening/"
    int dataState = 0; //0=Data entry, 1=Review

    static content = {
      // Common
      nextStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-next-step"]',dataState) }  // This will always find the active next button, common for all pages
      previousStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-previous-step"]',dataState) }

      accMotel { $("INPUT", "data-test": "cb-form-accMotel", dataState ) }
      accTents { $("INPUT", "data-test": "cb-form-accTents", dataState ) }
      accWorkersHome { $("INPUT", "data-test": "cb-form-accWorkersHome", dataState ) }
      agreeToInspection { $("INPUT", "data-test": "cb-form-agreeToInspection", dataState ) }
      businessAddressCity { $("INPUT", "data-test": "text-form-businessAddressCity", dataState ) }
      businessAddressLine1 { $("INPUT", "data-test": "text-form-businessAddressLine1", dataState ) }
      businessAddressLine2 { $("INPUT", "data-test": "text-form-businessAddressLine2", dataState ) }
      businessAddressPostalCode { $("INPUT", "data-test": "text-form-businessAddressPostalCode", dataState ) }
      businessAddressProvince { $("INPUT", "data-test": "select-form-businessAddressProvince", dataState ) }
      businessName { $("INPUT", "data-test": "text-form-businessName" ) }
      cdcButton { $("A", "data-test": "btn-form-cdc", dataState ) }
      certifyAccurateInformation { $("INPUT", "data-test": "cb-form-certifyAccurateInformation" ) }
      cityLatitude { $("INPUT", "data-test": "text-form-cityLatitude", dataState ) }
      cityLongitude { $("INPUT", "data-test": "text-form-cityLongitude", dataState ) }
      cityLookupfieldModel { $("INPUT", "data-test": "text-form-city-lookup-fieldModel" ) }
      covidEmail { $("INPUT", "data-test": "text-form-covidEmail", dataState ) }
      covidFirstName { $("INPUT", "data-test": "text-form-covidFirstName", dataState ) }
      covidLastName { $("INPUT", "data-test": "text-form-covidLastName", dataState ) }
      covidPhone1 { $("INPUT", "data-test": "text-form-covidPhone1", dataState ) }
      covidPhone2 { $("INPUT", "data-test": "text-form-covidPhone2", dataState ) }
      disinfectingSchedule { $("INPUT", "data-test": "cb-form-disinfectingSchedule", dataState ) }
      distancingFaceShields { $("INPUT", "data-test": "cb-form-distancingFaceShields", dataState ) }
      distancingMaintained { $("INPUT", "data-test": "cb-form-distancingMaintained", dataState ) }
      educationContactPersonnel { $("INPUT", "data-test": "cb-form-educationContactPersonnel", dataState ) }
      educationSignage { $("INPUT", "data-test": "cb-form-educationSignage", dataState ) }
      eMail { $("INPUT", "data-test": "text-form-email", dataState ) }
      endDate { $("INPUT", "data-test": "text-form-endDate", dataState ) }
      endDateMenu { $("DIV", "data-test": "menu-form-endDate", dataState ) }
      firstName { $("INPUT", "data-test": "text-form-firstName", dataState ) }
      handWashingPaperTowels { $("INPUT", "data-test": "cb-form-handWashingPaperTowels", dataState ) }
      handWashingSignage { $("INPUT", "data-test": "cb-form-handWashingSignage", dataState ) }
      handWashingSoapWater { $("INPUT", "data-test": "cb-form-handWashingSoapWater", dataState ) }
      handWashingStations { $("INPUT", "data-test": "cb-form-handWashingStations", dataState ) }
      handWashingWaterless { $("INPUT", "data-test": "cb-form-handWashingWaterless", dataState ) }
      headerLogo { $("A", "data-test": "btn-header-logo" ) }
      headerTitle { $("H1", "data-test": "btn-header-title" ) }
      healthOfficer { $("A", "data-test": "btn-form-health-officer", dataState ) }
      infectedFeeding { $("INPUT", "data-test": "cb-form-infectedFeeding", dataState ) }
      infectedHousekeeping { $("INPUT", "data-test": "cb-form-infectedHousekeeping", dataState ) }
      infectedWaste { $("INPUT", "data-test": "cb-form-infectedWaste", dataState ) }
      infectionAccommodation { $("INPUT", "data-test": "cb-form-infectionAccommodation", dataState ) }
      infectionHeathLinkBC { $("INPUT", "data-test": "cb-form-infectionHeathLinkBC", dataState ) }
      infectionSanitization { $("INPUT", "data-test": "cb-form-infectionSanitization", dataState ) }
      infectionSeparation { $("INPUT", "data-test": "cb-form-infectionSeparation", dataState ) }
      infectionSymptoms { $("INPUT", "data-test": "cb-form-infectionSymptoms", dataState ) }
      lastName { $("INPUT", "data-test": "text-form-lastName", dataState ) }
      laundryServices { $("INPUT", "data-test": "cb-form-laundryServices", dataState ) }
      locationCity { $("INPUT", "data-test": "text-form-locationCity" ) }
      mealsDishware { $("INPUT", "data-test": "cb-form-mealsDishware", dataState ) }
      mealsDishwashing { $("INPUT", "data-test": "cb-form-mealsDishwashing", dataState ) }
      mealsDistancing { $("INPUT", "data-test": "cb-form-mealsDistancing", dataState ) }
      numberOfWorkers { $("INPUT", "data-test": "text-form-numberOfWorkers", dataState ) }
      orgbookSearch { $("INPUT", "data-test": "text-form-orgbook-search-fieldModel" ) }
      phoneNr1 { $("INPUT", "data-test": "text-form-phone1", dataState ) }
      phoneNr2 { $("INPUT", "data-test": "text-form-phone2", dataState ) }
      protectionSignage { $("INPUT", "data-test": "cb-form-protectionSignage", dataState ) }
      selfIsolateAccommodation { $("INPUT", "data-test": "cb-form-selfIsolateAccommodation", dataState ) }
      selfIsolateUnderstood { $("INPUT", "data-test": "cb-form-selfIsolateUnderstood", dataState ) }
      sharedSleepingCommunication { $("INPUT", "data-test": "cb-form-sharedSleepingCommunication", dataState ) }
      sharedSleepingDistancing { $("INPUT", "data-test": "cb-form-sharedSleepingDistancing", dataState ) }
      sharedSleepingProvidedAccommodations { $("INPUT", "data-test": "cb-form-sharedSleepingProvidedAccommodations", dataState ) }
      startDate { $("INPUT", "data-test": "text-form-startDate", dataState ) }
      startDateMenu { $("DIV", "data-test": "menu-form-startDate", dataState ) }
      stepperFive { $("DIV", "data-test": "btn-stepper-five" ) }
      stepperFour { $("DIV", "data-test": "btn-stepper-four" ) }
      stepperOne { $("DIV", "data-test": "btn-stepper-one" ) }
      stepperThree { $("DIV", "data-test": "btn-stepper-three" ) }
      stepperTwo { $("DIV", "data-test": "btn-stepper-two" ) }
      submitForm { $("BUTTON", "data-test": "btn-form-submit" ) }
      testData { $("BUTTON", "data-test": "btn-form-test-data", dataState ) }
      tostepFour { $("BUTTON", "data-test": "btn-form-to-step-four" ) }
      tostepOne { $("BUTTON", "data-test": "btn-form-to-step-one" ) }
      tostepThree { $("BUTTON", "data-test": "btn-form-to-step-three" ) }
      tostepTwo { $("BUTTON", "data-test": "btn-form-to-step-two" ) }
      trainingCovid19 { $("INPUT", "data-test": "cb-form-trainingCovid19", dataState ) }
      trainingEtiquette { $("INPUT", "data-test": "cb-form-trainingEtiquette", dataState ) }
      trainingFirstAid { $("INPUT", "data-test": "cb-form-trainingFirstAid", dataState ) }
      trainingLocations { $("INPUT", "data-test": "cb-form-trainingLocations", dataState ) }
      trainingReporting { $("INPUT", "data-test": "cb-form-trainingReporting", dataState ) }
      transportationBusesVans { $("INPUT", "data-test": "cb-form-transportationBusesVans", dataState ) }
      transportationCleaningDistancing { $("INPUT", "data-test": "cb-form-transportationCleaningDistancing", dataState ) }
      transportationHelicopter { $("INPUT", "data-test": "cb-form-transportationHelicopter", dataState ) }
      transportationSingleOccupant { $("INPUT", "data-test": "cb-form-transportationSingleOccupant", dataState ) }
      transportationTravelPod { $("INPUT", "data-test": "cb-form-transportationTravelPod", dataState ) }
      transportationTrucksCars { $("INPUT", "data-test": "cb-form-transportationTrucksCars", dataState ) }
      wasteManagementBags { $("INPUT", "data-test": "cb-form-wasteManagementBags", dataState ) }
      wasteManagementGloves { $("INPUT", "data-test": "cb-form-wasteManagementGloves", dataState ) }
      wasteManagementSchedule { $("INPUT", "data-test": "cb-form-wasteManagementSchedule", dataState ) }
      workerContactPersonnel { $("INPUT", "data-test": "cb-form-workerContactPersonnel", dataState ) }

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
/* Elements	Instances
btn-form-to-next-step { $("BUTTON", "data-test": "btn-form-to-next-step" ) }	10
btn-form-to-previous-step { $("BUTTON", "data-test": "btn-form-to-previous-step" ) }	9
btn-form-disease-control-link { $("A", "data-test": "btn-form-disease-control-link" ) }	2
btn-form-empr-office-link { $("A", "data-test": "btn-form-empr-office-link" ) }	2
btn-form-health-pdf-link { $("A", "data-test": "btn-form-health-pdf-link" ) }	2
btn-form-panel-camp-order { $("BUTTON", "data-test": "btn-form-panel-camp-order" ) }	2
btn-form-panel-ipc-protocol { $("BUTTON", "data-test": "btn-form-panel-ipc-protocol" ) }	2
btn-form-test-data { $("BUTTON", "data-test": "btn-form-test-data" ) }	2
cb-form-accMotel { $("INPUT", "data-test": "cb-form-accMotel" ) }	2
cb-form-accTents { $("INPUT", "data-test": "cb-form-accTents" ) }	2
cb-form-accWorkersHome { $("INPUT", "data-test": "cb-form-accWorkersHome" ) }	2
cb-form-disinfectingSchedule { $("INPUT", "data-test": "cb-form-disinfectingSchedule" ) }	2
cb-form-distancingFaceShields { $("INPUT", "data-test": "cb-form-distancingFaceShields" ) }	2
cb-form-distancingMaintained { $("INPUT", "data-test": "cb-form-distancingMaintained" ) }	2
cb-form-educationContactPersonnel { $("INPUT", "data-test": "cb-form-educationContactPersonnel" ) }	2
cb-form-educationSignage { $("INPUT", "data-test": "cb-form-educationSignage" ) }	2
cb-form-handWashingPaperTowels { $("INPUT", "data-test": "cb-form-handWashingPaperTowels" ) }	2
cb-form-handWashingSignage { $("INPUT", "data-test": "cb-form-handWashingSignage" ) }	2
cb-form-handWashingSoapWater { $("INPUT", "data-test": "cb-form-handWashingSoapWater" ) }	2
cb-form-handWashingStations { $("INPUT", "data-test": "cb-form-handWashingStations" ) }	2
cb-form-handWashingWaterless { $("INPUT", "data-test": "cb-form-handWashingWaterless" ) }	2
cb-form-infectedFeeding { $("INPUT", "data-test": "cb-form-infectedFeeding" ) }	2
cb-form-infectedHousekeeping { $("INPUT", "data-test": "cb-form-infectedHousekeeping" ) }	2
cb-form-infectedWaste { $("INPUT", "data-test": "cb-form-infectedWaste" ) }	2
cb-form-infectionAccommodation { $("INPUT", "data-test": "cb-form-infectionAccommodation" ) }	2
cb-form-infectionHeathLinkBC { $("INPUT", "data-test": "cb-form-infectionHeathLinkBC" ) }	2
cb-form-infectionSanitization { $("INPUT", "data-test": "cb-form-infectionSanitization" ) }	2
cb-form-infectionSeparation { $("INPUT", "data-test": "cb-form-infectionSeparation" ) }	2
cb-form-infectionSymptoms { $("INPUT", "data-test": "cb-form-infectionSymptoms" ) }	2
cb-form-laundryServices { $("INPUT", "data-test": "cb-form-laundryServices" ) }	2
cb-form-mealsDishware { $("INPUT", "data-test": "cb-form-mealsDishware" ) }	2
cb-form-mealsDishwashing { $("INPUT", "data-test": "cb-form-mealsDishwashing" ) }	2
cb-form-mealsDistancing { $("INPUT", "data-test": "cb-form-mealsDistancing" ) }	2
cb-form-protectionSignage { $("INPUT", "data-test": "cb-form-protectionSignage" ) }	2
cb-form-selfIsolateAccommodation { $("INPUT", "data-test": "cb-form-selfIsolateAccommodation" ) }	2
cb-form-selfIsolateUnderstood { $("INPUT", "data-test": "cb-form-selfIsolateUnderstood" ) }	2
cb-form-trainingCovid19 { $("INPUT", "data-test": "cb-form-trainingCovid19" ) }	2
cb-form-trainingEtiquette { $("INPUT", "data-test": "cb-form-trainingEtiquette" ) }	2
cb-form-trainingFirstAid { $("INPUT", "data-test": "cb-form-trainingFirstAid" ) }	2
cb-form-trainingLocations { $("INPUT", "data-test": "cb-form-trainingLocations" ) }	2
cb-form-trainingReporting { $("INPUT", "data-test": "cb-form-trainingReporting" ) }	2
cb-form-transportationBusesVans { $("INPUT", "data-test": "cb-form-transportationBusesVans" ) }	2
cb-form-transportationCleaningDistancing { $("INPUT", "data-test": "cb-form-transportationCleaningDistancing" ) }	2
cb-form-transportationHelicopter { $("INPUT", "data-test": "cb-form-transportationHelicopter" ) }	2
cb-form-transportationSingleOccupant { $("INPUT", "data-test": "cb-form-transportationSingleOccupant" ) }	2
cb-form-transportationTravelPod { $("INPUT", "data-test": "cb-form-transportationTravelPod" ) }	2
cb-form-transportationTrucksCars { $("INPUT", "data-test": "cb-form-transportationTrucksCars" ) }	2
cb-form-wasteManagementBags { $("INPUT", "data-test": "cb-form-wasteManagementBags" ) }	2
cb-form-wasteManagementGloves { $("INPUT", "data-test": "cb-form-wasteManagementGloves" ) }	2
cb-form-wasteManagementSchedule { $("INPUT", "data-test": "cb-form-wasteManagementSchedule" ) }	2
cb-form-workerContactPersonnel { $("INPUT", "data-test": "cb-form-workerContactPersonnel" ) }	2
menu-form-endDateMenu { $("DIV", "data-test": "menu-form-endDateMenu" ) }	2
menu-form-startDateMenu { $("DIV", "data-test": "menu-form-startDateMenu" ) }	2
select-form-businessAddressProvince { $("INPUT", "data-test": "select-form-businessAddressProvince" ) }	2
text-form-businessAddressCity { $("INPUT", "data-test": "text-form-businessAddressCity" ) }	2
text-form-businessAddressLine1 { $("INPUT", "data-test": "text-form-businessAddressLine1" ) }	2
text-form-businessAddressLine2 { $("INPUT", "data-test": "text-form-businessAddressLine2" ) }	2
text-form-businessAddressPostalCode { $("INPUT", "data-test": "text-form-businessAddressPostalCode" ) }	2
text-form-cityLatitude { $("INPUT", "data-test": "text-form-cityLatitude" ) }	2
text-form-cityLongitude { $("INPUT", "data-test": "text-form-cityLongitude" ) }	2
text-form-covidEmail { $("INPUT", "data-test": "text-form-covidEmail" ) }	2
text-form-covidFirstName { $("INPUT", "data-test": "text-form-covidFirstName" ) }	2
text-form-covidLastName { $("INPUT", "data-test": "text-form-covidLastName" ) }	2
text-form-covidPhone1 { $("INPUT", "data-test": "text-form-covidPhone1" ) }	2
text-form-covidPhone2 { $("INPUT", "data-test": "text-form-covidPhone2" ) }	2
text-form-email { $("INPUT", "data-test": "text-form-email" ) }	2
text-form-endDate { $("INPUT", "data-test": "text-form-endDate" ) }	2
text-form-firstName { $("INPUT", "data-test": "text-form-firstName" ) }	2
text-form-mineNumber { $("INPUT", "data-test": "text-form-mineNumber" ) }	2
text-form-numberOfWorkers { $("INPUT", "data-test": "text-form-numberOfWorkers" ) }	2
text-form-permitNumber { $("INPUT", "data-test": "text-form-permitNumber" ) }	2
text-form-phone2 { $("INPUT", "data-test": "text-form-phone2" ) }	2
text-form-startDate { $("INPUT", "data-test": "text-form-startDate" ) }	2
​text-form-lastName { $("INPUT", "data-test": "text-form-lastName" ) }	1
​text-form-phone1 { $("INPUT", "data-test": "text-form-phone1" ) }	1
btn-footer-about { $("A", "data-test": "btn-footer-about" ) }	1
btn-footer-accessibility { $("A", "data-test": "btn-footer-accessibility" ) }	1
btn-footer-contact { $("A", "data-test": "btn-footer-contact" ) }	1
btn-footer-copyright { $("A", "data-test": "btn-footer-copyright" ) }	1
btn-footer-disclaimer { $("A", "data-test": "btn-footer-disclaimer" ) }	1
btn-footer-home { $("A", "data-test": "btn-footer-home" ) }	1
btn-footer-privacy { $("A", "data-test": "btn-footer-privacy" ) }	1
btn-form-submit { $("BUTTON", "data-test": "btn-form-submit" ) }	1
btn-form-to-step-five { $("BUTTON", "data-test": "btn-form-to-step-five" ) }	1
btn-form-to-step-four { $("BUTTON", "data-test": "btn-form-to-step-four" ) }	1
btn-form-to-step-one { $("BUTTON", "data-test": "btn-form-to-step-one" ) }	1
btn-form-to-step-three { $("BUTTON", "data-test": "btn-form-to-step-three" ) }	1
btn-form-to-step-two { $("BUTTON", "data-test": "btn-form-to-step-two" ) }	1
btn-header-logo { $("A", "data-test": "btn-header-logo" ) }	1
btn-header-title { $("H1", "data-test": "btn-header-title" ) }	1
btn-stepper-five { $("DIV", "data-test": "btn-stepper-five" ) }	1
btn-stepper-four { $("DIV", "data-test": "btn-stepper-four" ) }	1
btn-stepper-one { $("DIV", "data-test": "btn-stepper-one" ) }	1
btn-stepper-six { $("DIV", "data-test": "btn-stepper-six" ) }	1
btn-stepper-three { $("DIV", "data-test": "btn-stepper-three" ) }	1
btn-stepper-two { $("DIV", "data-test": "btn-stepper-two" ) }	1
cb-form-agreeToInspection { $("INPUT", "data-test": "cb-form-agreeToInspection" ) }	1
cb-form-certifyAccurateInformation { $("INPUT", "data-test": "cb-form-certifyAccurateInformation" ) }	1
text-form-businessName { $("INPUT", "data-test": "text-form-businessName" ) }	1
text-form-city-lookup-fieldModel { $("INPUT", "data-test": "text-form-city-lookup-fieldModel" ) }	1
text-form-lastName { $("INPUT", "data-test": "text-form-lastName" ) }	1
text-form-locationCity { $("INPUT", "data-test": "text-form-locationCity" ) }	1
text-form-orgbook-search-fieldModel { $("INPUT", "data-test": "text-form-orgbook-search-fieldModel" ) }	1
text-form-phone1 { $("INPUT", "data-test": "text-form-phone1" ) }	1
 */
