//
// Text options specific to each attestation
//

// Form-specific options objects
// (these will be populated more later)
const Options = Object.freeze({
  cloudeconomicmodel: {
    operators: 'Cloud Economic Model',
    landing: {
      header: 'Economic modeling spreadsheet generation',
    }
  },
  submissionConfirmation: {
    notifyHealthAuth: {
      text: 'AS PART OF THE PRECAUTIONS TO PREVENT/CONTROL COVID-19, CAMP OPERATORS MUST NOTIFY RHA THAT THEY ARE OPERATING IN THE REGION. PLEASE FORWARD THE PDF COPY OF YOUR SUBMISSION TO THE RELEVANT HEALTH AUTHORITY.',
      link: 'https://www2.gov.bc.ca/gov/content/health/keeping-bc-healthy-safe/industrial-camps',
      linkText: 'Health Authority Contacts for Industrial Camps'
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
