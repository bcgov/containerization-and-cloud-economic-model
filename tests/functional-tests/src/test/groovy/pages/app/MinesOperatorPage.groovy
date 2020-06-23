package pages

class MinesOperatorPage extends BaseAppPage {

    static at = { title == "Industrial Camps" && headerModule.headerTitle.text() == "Industrial Camps"}
    static url = "minesoperatorscreening/"

    static content = {
      // Common
      nextStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-next-step"]',0) }  // This will always find the active next button, common for all pages
      previousStep { $('.v-stepper__content:not([style*="none"]) [data-test="btn-form-to-previous-step"]',0) }

      // Page 1


      // Page 2
      lowerTitle { $("h2", text:"Provide Your Business Contact Information") }

      // Business Name
      registeredBusinessName { $('input', placeholder:"Start typing to search the OrgBook database") }
      firstName { $("input", "data-test":"text-form-firstName",0) }
      lastName { $("input", "data-test":"text-form-lastName",0) }
      phoNe1 { $("input", "data-test":"text-form-phone1",0 ) }
      phoNe2 { $("input", "data-test":"text-form-phone2",0 ) }
      eMail { $("input", "data-test":"text-form-email",0 ) }

      businessAddressLine1 { $("input", "data-test":"text-form-businessAddressLine1",0 ) }
      businessAddressLine2 { $("input", "data-test":"text-form-businessAddressLine2",0 ) }
      businessAddressCity { $("input", "data-test":"text-form-businessAddressCity", 0 ) }
      businessAddressProvince { $("input", "data-test":"select-form-businessAddressProvince",0 ) }
      businessAddressPostalCode { $("input", "data-test":"text-form-businessAddressPostalCode",0 ) }

      //COVID-19 Coordinator
      covidFirstName { $("input", "data-test":"text-form-covidFirstName",0 ) }
      covidLastName { $("input", "data-test":"text-form-covidLastName",0 ) }
      covidPhone1 { $("input", "data-test":"text-form-covidPhone1",0 ) }
      covidPhone2 { $("input", "data-test":"text-form-covidPhone2",0 ) }
      covidEmail { $("input", "data-test":"text-form-covidEmail",0 ) }

      // Provide your accommodation details
      startDate { $("input", "data-test":"text-form-startDate",0 ) }
      endDate { $("input", "data-test":"text-form-endDate",0 ) }
      closestCity { $("input", placeholder:"Start typing to search for cities in BC", 0) }
      numberOfWorkers { $("input", "data-test":"text-form-numberOfWorkers",0 ) }
      // Hidden fields
      cityLatitude { $("input", "data-test":"text-form-cityLatitude",0 ) }
      cityLongitude { $("input", "data-test":"text-form-cityLongitude",0 ) }

      //Type of accommodation for workers at this location
      cbFormaccTents { $("input", "data-test":"cb-form-accTents",0) }
      tentDetails { $("input", "data-test":"text-form-tentDetails",0) }

      cbFormaccMotel { $("input", role:"checkbox", "data-test":"cb-form-accMotel",0) }
      motelName { $('input', "data-test":"text-form-motelName",0) }
      motelAddressLine1 { $('input', "data-test":"text-form-motelAddressLine1",0) }
      motelAddressLine2 { $('input', "data-test":"text-form-motelAddressLine2",0) }
      motelCity { $('input', "data-test":"text-form-motelCity",0) }
      motelProvince { $('input', "data-test":"select-form-motelProvince",0) }
      motelPostalCode { $('input', "data-test":"text-form-motelPostalCode",0) }

      accWorkersHome { $('input', role:"checkbox", "data-test":"cb-form-accWorkersHome",0) }

      // Authorization Information
      // mineNumber will be update with a proper data-test attribute
      mineNumber {$("input", "data-test":"text-form-mineNumber",0 ) }
      permitNumber { $("input", "data-test":"text-form-permitNumber",0 ) }

      // Page 3
      lowerTitlePg3 { $("h2", class:"pb-8", text:"Before operations begin, please check all that apply") }

      //  COVID-19 Information
      protectionSignage { $("input", type:"checkbox","data-test":"cb-form-protectionSignage",0) }
      workerContactPersonnel { $("input", type:"checkbox", "data-test":"cb-form-workerContactPersonnel",0) }

      // Provide safe lodging and accommodation: General Worker
      commonAreaYes { $("input", type:"radio", 0) }
      commonAreaNo { $("input", type:"radio", 1) }

      bedSituationInd { $("input", type:"radio", 2) }
      bedSituationShare { $("input", type:"radio", 3) }
      sharedSleepingPerRoom { $("input", type:"text", "data-test":"select-form-sharedSleepingPerRoom",0) }
      sharedSleepingDistancing { $("input", type:"checkbox", "data-test":"cb-form-sharedSleepingDistancing",0) }

      // Self-isolation space if a worker comes down with COVID-19-like symptoms
      selfIsolateUnderstood { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateUnderstood",0) }
      selfIsolateAccommodation { $("input", type:"checkbox", "data-test":"cb-form-selfIsolateAccommodation",0) }

      // Make sure laundry services are available and handled safely
      laundryServices { $("input", type:"checkbox", "data-test":"cb-form-laundryServices",0) }

      // Practicing waste management: At work-site and accommodation
      wasteManagementGloves { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementGloves",0) }
      wasteManagementSchedule { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementSchedule",0) }
      wasteManagementBags { $("input", type:"checkbox", "data-test":"cb-form-wasteManagementBags",0) }

      //Have proper hand-washing facilities: At work-site and accommodation
      handWashingStations { $("input", type:"checkbox", "data-test":"cb-form-handWashingStations",0) }
      handWashingSoapWater { $("input", type:"checkbox", "data-test":"cb-form-handWashingSoapWater",0) }
      handWashingWaterless { $("input", type:"checkbox", "data-test":"cb-form-handWashingWaterless",0) }
      handWashingPaperTowels { $("input", type:"checkbox", "data-test":"cb-form-handWashingPaperTowels",0) }
      handWashingSignage { $("input", type:"checkbox", "data-test":"cb-form-handWashingSignage",0) }

      //Physical Distancing Practices
      distancingMaintained { $("input", type:"checkbox", "data-test":"cb-form-distancingMaintained",0) }
      distancingFaceShields { $("input", type:"checkbox", "data-test":"cb-form-distancingFaceShields",0) }

      //Have a Cleaning and Disinfecting Schedule
      disinfectingSchedule { $("input", type:"checkbox", "data-test":"cb-form-disinfectingSchedule",0) }

      //Transportation of Workers
      transportationSingleOccupant { $("input", type:"checkbox", "data-test":"cb-form-transportationSingleOccupant",0) }
      transportationBusesVans { $("input", type:"checkbox", "data-test":"cb-form-transportationBusesVans",0) }
      transportationTrucksCars { $("input", type:"checkbox", "data-test":"cb-form-transportationTrucksCars",0) }
      transportationHelicopter { $("input", type:"checkbox", "data-test":"cb-form-transportationHelicopter",0) }
      transportationTravelPod { $("input", type:"checkbox", "data-test":"cb-form-transportationTravelPod",0) }
      transportationCleaningDistancing { $("input", type:"checkbox", "data-test":"cb-form-transportationCleaningDistancing",0) }
    }

    void NextStep(){
      waitFor { nextStep.displayed }
      nextStep.click()
    }
    void PreviousStep(){
      waitFor { previousStep.displayed }
      previousStep.click()
    }
}
