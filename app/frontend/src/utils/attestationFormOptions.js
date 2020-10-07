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
