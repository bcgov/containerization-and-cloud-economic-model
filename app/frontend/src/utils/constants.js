//
// Constants
//

// Registered Form Names
const FormNames = Object.freeze({
  CLOUDECONOMICMODEL: 'cloudeconomicmodel'
});

// Add slash prefix to FormNames values
const ApiRoutes = Object.freeze(
  Object.assign(
    {},
    ...Object.entries(FormNames).map(([k, v]) => ({ [k]: `/${v}` })))
);

// Registered Application Setting Names
const AppSettings = Object.freeze({
  DASHBOARD: 'dashboards',
  EMAILACCESSREQUESTED: 'accessRequestedEmail',
  EMAILCONFIRMATION: 'confirmationEmail',
  EMAILSTATUSASSIGNMENT: 'statusAssignmentEmail',
  EMAILSUBMISSION: 'submissionEmail',
  GENERATESUBMISSIONPDF: 'generateSubmissionPdf'
});

//
// Utility Functions
//

/**
 * @function isValidForm
 * Checks if `form` is a valid form name
 * @param {string} form The form name
 * @returns {boolean} True if `form` is valid form
 */
const isValidForm = form => Object.values(FormNames).includes(form);

export { FormNames, ApiRoutes, AppSettings, isValidForm };
