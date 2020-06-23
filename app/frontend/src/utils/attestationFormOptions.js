//
// Text options specific to each attestation
//

// Form-specific options objects
// (these will be populated more later)
const Options = Object.freeze({
  agriseafoodopscreening: {
    operators: 'Agriculture and Seafood Operators',
    landing: {
      header: 'Protecting Farm Workers and Temporary Foreign Workers During the COVID-19 Pandemic',
      beforeStartInfo: 'If you employ <a href="https://www2.gov.bc.ca/gov/content/industry/agriculture-seafood/covid-19-response/temporary-foreign-farmworkers#inspections" target="_blank" data-test="btn-form-complete-site-inspection"> Temporary Foreign Workers and have already completed a site inspection, <i aria-hidden="true" class="v-icon notranslate material-icons theme--light primary--text">open_in_new</i> </a> you do not require a second inspection unless you are planning to use new accommodation sites that have never had an inspection.',
      pdfDocs: [
        {
          title: 'Protecting Farm Workers and Temporary Foreign Workers During the COVID-19 Pandemic',
          link: 'https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-farms-farm-workers.pdf'
        },
        {
          title: 'COVID-19 pandemic PHO Order Industrial Camps: What does it mean for B.C.\'s agriculture and seafood industry?',
          link: 'https://www2.gov.bc.ca/assets/gov/farming-natural-resources-and-industry/agriculture-and-seafood/covid-19/agri_qa_pho_order_industrial_camps.pdf'
        },
      ],
      docShortTitle: 'COVID-19 guidance for farms and farm workers',
      contact: {
        head: 'The following contacts are available if you need assistance completing these risk assessment or infection prevention tasks:',
        list: [
          '<h4>Agriculture Operators contact</h4><p class="mb-0 pb-0">AgSafeBC<br />Toll-free: 1-877-533-1789<br />Email: <a href="mailto:Contact@AgSafeBC.ca" data-test="btn-form-contact-email-1">Contact@AgSafeBC.ca</a>',
          '<h4>Seafood Operators contact</h4><p class="mb-0 pb-0">WorkSafeBC<br />Toll-free: 1-888-621-7233 (1-888-621-SAFE)<br />Email WorkSafeBC: <a target="_blank" href="https://gems.online.worksafebc.com/emailus?_ga=2.36658272.1710059602.1591993589-423167262.1587748063" data-test="btn-form-contact-email-2">Contact Us Form <i aria-hidden="true" class="v-icon notranslate material-icons theme--light primary--text" style="font-size: 16px;">open_in_new</i></a>'
        ]
      }
    }
  },
  forestrysectoropscreening: {
    operators: 'Forestry Sector Operators',
    landing: {
      header: 'Protect employees, contractors, and employers, during the COVID-19 pandemic',
      pdfDocs: [
        {
          title: 'Protecting Employees, Contractors, and Employers Working ... During the COVID-19 Pandemic',
          link: 'https://www2.gov.bc.ca/assets/gov/health/about-bc-s-health-care-system/office-of-the-provincial-health-officer/covid-19/covid-19-pho-guidance-work-camps-silviculture.pdf'
        }
      ],
      docShortTitle: 'COVID-19 Guidelines for Forestry Sector Work Camps',
      contact: {
        head: 'If you need assistance completing these risk assessment or infection prevention tasks, please email <a href="mailto:FP.Engagement@gov.bc.ca">FP.Engagement@gov.bc.ca</a>',
      }
    },
    submissionConfirmation: {
      notifyHealthAuth: {
        text: 'AS PART OF THE PRECAUTIONS TO PREVENT/CONTROL COVID-19, CAMP OPERATORS MUST NOTIFY RHA THAT THEY ARE OPERATING IN THE REGION. PLEASE FORWARD THE PDF COPY OF YOUR SUBMISSION TO THE RELEVANT HEALTH AUTHORITY.',
        link: 'https://www2.gov.bc.ca/gov/content/health/keeping-bc-healthy-safe/industrial-camps',
        linkText: 'Health Authority Contacts for Industrial Camps'
      }
    }
  },
  minesoperatorscreening: {
    operators: 'Industrial Camp Operators',
    landing: {
      header: 'Protect Industrial Camp employees, contractors, and employers, during the COVID-19 pandemic'
    }
  }
});


//
// Utility Functions
//

/**
 * @function getFormOptions
 * Returns the specific options for the form
 * @param {string} formName The form name
 * @returns {string} The options object
 */
const getFormOptions = formName => {
  const option = Options[formName];
  if (!option) {
    throw new Error(`Could not retrieve options for form ${formName}`);
  }
  return option;
};

export { Options, getFormOptions };
