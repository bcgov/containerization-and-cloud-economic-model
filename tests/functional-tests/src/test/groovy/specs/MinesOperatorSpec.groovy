package specs

import geb.spock.GebReportingSpec
import listeners.BrowserStackReportingSpec
import pages.MinesOperatorPage
import org.openqa.selenium.Keys
//GebReportingSpec


class MinesOperatorSpec extends BrowserStackReportingSpec {

    def "As a user, I want to fill in the Mines Operator Form."() {
        when: 'I enter the url for the Form'
          to MinesOperatorPage
          InjectjQuery()
        then: 'I arrive at the correct page'
          at MinesOperatorPage
        when: 'I click on the -Go to Step 2- Button'
          NextStep()
        then: 'I see the second page'
          assert lowerTitle

          //Registered Business Name
          registeredBusinessName.value("STENS CONSULTING INC.")

          //Primary Contact
          firstName.value("First Name")
          lastName.value("Last Name")
          phoNe1.value("1234567890")
          phoNe2.value("3335551234")
          eMail.value("fake@email.com")

          //Business Address
          businessAddressLine1.value("BA Line 1")
          businessAddressLine2.value("BA line 2")
          businessAddressCity.value("BA City")
          businessAddressProvince << "AB"
          businessAddressPostalCode.value("X9X9X9")

          //COVID-19 Coordinator
          covidFirstName.value("covid First Name")
          covidLastName.value("covid Last Name")
          covidPhone1.value("123456789")
          covidPhone2.value("9087654321")
          covidEmail.value("covid@email.com")

          //Provide your accommodation details
          startDate.click()
          //Thread.sleep(500)
          startDate.jquery.removeAttr("readonly") //Nasty Hack to make the dates working
          startDate << "2020-06-15"

          endDate.click()
          //Thread.sleep(500)
          endDate.jquery.removeAttr("readonly") //Nasty Hack to make the dates working
          endDate << "2021-07-15"

          closestCity.click()
          closestCity.value("Langley, BC")

          numberOfWorkers.value("999")

          //Type of accommodation for workers at this location (check all that apply)
          cbFormaccTents.jquery.click()
          tentDetails.value("Test Details")
          cbFormaccMotel.jquery.click()
          motelName.value("Motel Name")
          motelAddressLine1.value("Motel Line 1")
          motelAddressLine2.value("Motel Line 2")
          motelCity.value("Motel City")
          motelProvince << "AB"
          motelPostalCode.value("X9X9X9")
          accWorkersHome.jquery.click()

          //Authorization Information
          mineNumber.value(Math.abs(new Random().nextInt(999999) + 1000000))
          permitNumber.value("123456")
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

          at MinesOperatorPage
          Thread.sleep(5000)

          waitFor { previousStep.displayed }
          previousStep.click()
      }
}
