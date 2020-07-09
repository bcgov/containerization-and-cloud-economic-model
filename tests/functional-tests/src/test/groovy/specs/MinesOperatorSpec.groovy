package specs

import geb.spock.GebSpec
import spock.lang.Stepwise
import pages.MinesOperatorPage
import org.openqa.selenium.Keys
import specs.traits.Utils

class MinesOperatorSpec extends BaseSpec implements Utils {

    def "As a user, I want to fill in the Mines Operator Form."() {
        when: 'I enter the url for the Form'
          to MinesOperatorPage
          injectjQuery()
        then: 'I arrive at the correct page'
          at MinesOperatorPage
        when: 'I click on the -Go to Step 2- Button'
          NextStep()
        then: 'I see the second page, and I can enter the information'
          //Registered Business Name
          setRegisteredBusinessName(businessName)

          //Primary Contact
          setFirstName(firstNameBusiness)
          setLastName(lastNameBusiness)
          setPhone(phoneNumberBusiness)
          setAlternativePhone(alternativePhoneNumberBusiness)
          setEmail(emailBusiness)

          //Business Address
          // Creating Setters for all fields needs to be done, but the below works
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

          closestCity.jquery.click()
          closestCity.value(randomCityName() +', ' + randomProvince())

          numberOfWorkers.value(Math.abs(new Random().nextInt() % 600) + 1)

          //Type of accommodation for workers at this location (check all that apply)
          accTents.click()
          tentDetails.value(randomDescription())

          //Motel
          accMotel.click()
          motelName.value(randomFirstName() + ' Motel')
          motelAddressLine1.value(randomStreetName())
          motelAddressLine2.value(randomStreetName())
          motelCity.value(randomCityName())
          motelProvince << randomProvince()
          motelPostalCode.value(randomPostalCode())

          //Worker's Home
          accWorkersHome.click()

          //Authorization Information
          setMineNumber()
          setPermitNumber()
          permitNumber.click()
          permitNumber << Keys.chord(Keys.TAB) //Needed to properly move to the next field

        when: 'I click on the -Go to Step 3- Button'
          NextStep()

        then: "I am at the third page"
          at MinesOperatorPage
          waitFor { lowerTitlePg3.displayed }

        when: 'I fill out the form'
          protectionSignage.click()
          workerContactPersonnel.click()

          //Radio Buttons
          commonAreaYes.jquery.click()
          commonAreaNo.jquery.click()
          bedSituationInd.jquery.click()
          bedSituationShare.jquery.click()

          //Bedrooms
          sharedSleepingPerRoom.click()
          selectNumberofBeds(4)
          sharedSleepingDistancing.click()

          //Checkboxes
          selfIsolateUnderstood.click()
          selfIsolateAccommodation.click()
          laundryServices.click()
          wasteManagementGloves.click()
          wasteManagementSchedule.click()
          wasteManagementBags.click()
          handWashingStations.click()
          handWashingSoapWater.click()
          handWashingWaterless.click()
          handWashingPaperTowels.click()
          handWashingSignage.click()
          distancingMaintained.click()
          distancingFaceShields.click()
          disinfectingSchedule.click()
          transportationSingleOccupant.click()
          transportationBusesVans.click()
          transportationTrucksCars.click()
          transportationHelicopter.click()
          transportationTravelPod.click()
          transportationCleaningDistancing.click()
          basetransportationCleaningDistancing << Keys.chord(Keys.TAB) //needed to cleanly go to the next field

        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 4, I can fill out the details'
          at MinesOperatorPage
          educationSignage.click()
          educationContactPersonnel.click()

          //Train workers on COVID-19 infection control
          trainingCovid19.click()
          trainingEtiquette.click()
          trainingLocations.click()
          trainingFirstAid.click()
          trainingReporting.click()

          //Meals Preparation: Practice safe food handling
          mealsDistancing.click()
          mealsDishware.click()
          mealsDishwashing.click()

        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 5, I can fill out the details'
          at MinesOperatorPage
          waitFor { $("h2", text: "If workers become ill at the operation").displayed }
          infectionSeparation.click()
          infectionSymptoms.click()
          infectionHeathLinkBC.click()
          infectionSanitization.click()
          infectionAccommodation.click()

          //Providing Food for Ill Workers
          infectedFeeding.click()

          //Housekeeping for Ill Workers
          infectedHousekeeping.click()

          //Waste Management for Ill Workers
          infectedWaste.click()

        then: 'I can continue to the next page'
          waitFor { nextStep.displayed }
          nextStep.click()

        when: 'I am at step 6, I can Certify the accuracy and agree to an inspection'
          at MinesOperatorPage
          certifyAccurateInformation.jquery.click()
          agreeToInspection.jquery.click()

        then: 'I am able to clcik the submit button'
          waitFor { submitForm.displayed }
          waitFor { submitForm.jquery.click() }

        when: 'I am the next page'
          waitFor { submittedTitle }
          waitFor { submitID }

        then: 'I can Review if the shown data is identifcal to what I entered.'

          // Check if all the entered data is correctly shown
          setReviewData(true)
          assert checkregisteredBusinessName(businessName)
          assert firstName.value() == firstNameBusiness
          assert lastName.value() == lastNameBusiness
          assert phoNe1.value() == phoneNumberBusiness
          assert phoNe2.value() == alternativePhoneNumberBusiness
          assert eMail.value() == emailBusiness
          //to be expanded with all the fields

        where:
        businessName  ||  firstNameBusiness ||  lastNameBusiness  || phoneNumberBusiness  || alternativePhoneNumberBusiness ||  emailBusiness
        randomBusinessName()  ||  randomFirstName() || randomLastName() ||  randomPhoneNumber() || randomPhoneNumber()  || randomEmail()
      }
}

