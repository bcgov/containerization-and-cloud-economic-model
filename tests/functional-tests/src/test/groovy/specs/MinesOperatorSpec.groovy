package specs

import pages.MinesOperatorPage
import org.openqa.selenium.Keys
import specs.traits.Utils
import geb.Module

class MinesOperatorSpec extends BaseSpec implements Utils {

    def "As a user, I want to fill in the Mines Operator Form."() {
        when: 'I enter the url for the Form'
          to MinesOperatorPage
          injectjQuery()
        then: 'I arrive at the correct page'
          at MinesOperatorPage
        when: 'I click on the -Go to Step 2- Button'
          NextStep()
        then: 'I see the second page'
          assert lowerTitle

          //Registered Business Name
          setRegisteredBusinessName(randomBusinessName())

          //Primary Contact
          setFirstName(randomFirstName())
          setLastName(randomLastName())
          setPhone(randomPhoneNumber())
          setAlternativePhone(randomPhoneNumber())
          setEmail(randomEmail())

          //Business Address
          businessAddressLine1.value(randomStreetName())
          businessAddressLine2.value(randomStreetName())
          businessAddressCity.value(randomCityName())
          businessAddressProvince << randomProvince()
          businessAddressPostalCode.value(randomPostalCode())

          //COVID-19 Coordinator
          covidFirstName.value(randomFirstName())
          covidLastName.value(randomLastName())
          covidPhone1.value(randomPhoneNumber())
          covidPhone2.value(randomPhoneNumber())
          covidEmail.value(randomEmail())

          //Provide your accommodation details
          startDate.click()
          basestartDate.jquery.removeAttr("readonly") //Nasty Hack to make the dates working
          basestartDate << "2020-07-15"
          basestartDate.jquery.attr("readonly","readonly") //Nasty Hack to make the dates working

          endDate.click()
          baseendDate.jquery.removeAttr("readonly") //Nasty Hack to make the dates working
          baseendDate << "2021-07-15"
          baseendDate.jquery.attr("readonly","readonly") //Nasty Hack to make the dates working

          closestCity.click()
          closestCity.value(randomCityName() +', ' + randomProvince())

          numberOfWorkers.value(Math.abs(new Random().nextInt() % 600) + 1)

          //Type of accommodation for workers at this location (check all that apply)
          accTents.click()
          tentDetails.value(randomDescription())

          accMotel.click()

          motelName.value(randomFirstName() + ' Motel')
          motelAddressLine1.value(randomStreetName())
          motelAddressLine2.value(randomStreetName())
          motelCity.value(randomCityName())
          motelProvince << randomProvince()
          motelPostalCode.value(randomPostalCode())

          accWorkersHome.click()

          //Authorization Information
          setMineNumber()
          setPermitNumber()
          permitNumber.click()
          permitNumber << Keys.chord(Keys.TAB)
        when: 'I click on the -Go to Step 3- Button'
          NextStep()
        then: "I am at the third page"
          at MinesOperatorPage
          waitFor { lowerTitlePg3.displayed }
        when: 'I fill out the form'
          protectionSignage.jquery.click()
          workerContactPersonnel.jquery.click()
          commonAreaYes.jquery.click()
          commonAreaNo.jquery.click()
          bedSituationInd.jquery.click()
          bedSituationShare.jquery.click()
          //sharedSleepingPerRoom.value("3")
          sharedSleepingPerRoom.click()
          $("div", class:"v-list-item__title", text:"4", 0).click()
          sharedSleepingDistancing.jquery.click()

          selfIsolateUnderstood.jquery.click()
          selfIsolateAccommodation.jquery.click()
          laundryServices.jquery.click()
          wasteManagementGloves.jquery.click()
          wasteManagementSchedule.jquery.click()
          wasteManagementBags.jquery.click()
          handWashingStations.jquery.click()
          handWashingSoapWater.jquery.click()
          handWashingWaterless.jquery.click()
          handWashingPaperTowels.jquery.click()
          handWashingSignage.jquery.click()
          distancingMaintained.jquery.click()
          distancingFaceShields.jquery.click()
          disinfectingSchedule.jquery.click()
          transportationSingleOccupant.jquery.click()
          transportationBusesVans.jquery.click()
          transportationTrucksCars.jquery.click()
          transportationHelicopter.jquery.click()
          transportationTravelPod.jquery.click()
          transportationCleaningDistancing.jquery.click()
          transportationCleaningDistancing << Keys.chord(Keys.TAB)

        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 4, I can fill out the details'
          at MinesOperatorPage
          educationSignage.jquery.click()
          educationContactPersonnel.jquery.click()

          //Train workers on COVID-19 infection control
          trainingCovid19.jquery.click()
          trainingEtiquette.jquery.click()
          trainingLocations.jquery.click()
          trainingFirstAid.jquery.click()
          trainingReporting.jquery.click()

          //Meals Preparation: Practice safe food handling
          mealsDistancing.jquery.click()
          mealsDishware.jquery.click()
          mealsDishwashing.jquery.click()
        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 5, I can fill out the details'
          at MinesOperatorPage
          infectionSeparation.jquery.click()
          infectionSymptoms.jquery.click()
          infectionHeathLinkBC.jquery.click()
          infectionSanitization.jquery.click()
          infectionAccommodation.jquery.click()

          //Providing Food for Ill Workers
          infectedFeeding.jquery.click()

          //Housekeeping for Ill Workers
          infectedHousekeeping.jquery.click()

          //Waste Management for Ill Workers
          infectedWaste.jquery.click()

        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 6, I can fill out the details'
          at MinesOperatorPage
          certifyAccurateInformation.jquery.click()
          agreeToInspection.jquery.click()
          waitFor { subMit.displayed }
          waitFor { subMit.click() }

        then: 'I can continue to the next page'
          waitFor { $("h1", class:"pb-8", text: contains("successfully") ) }
          waitFor { $("h2", class: "mb-10") }
      }
}
