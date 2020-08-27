//
// Constants
//

// Registered Form Names
const FormNames = Object.freeze({
  AGRISEAFOODOPSCREENING: 'agriseafoodopscreening',
  FORESTRYSECTOROPSCREENING: 'forestrysectoropscreening',
  MINESOPERATORSCREENING: 'minesoperatorscreening',
  MYFORM: 'myform'
});

// Add slash prefix to FormNames values
const ApiRoutes = Object.freeze(
  Object.assign(
    {},
    ...Object.entries(FormNames).map(([k, v]) => ({ [k]: `/${v}` })))
);

// Add comfort- prefix to FormNames values
const AppClients = Object.freeze(
  Object.assign(
    { APP: 'comfort' },
    ...Object.entries(FormNames).map(([k, v]) => ({ [k]: `comfort-${v}` })))
);

// Registered Application Roles
const AppRoles = Object.freeze({
  ADMIN: 'admin',
  EDITOR: 'editor',
  REVIEWER: 'reviewer',
  USER: 'user',
  VIEWER: 'viewer'
});

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
 * @function getAppClient
 * Returns the AppClient associated with `formName`
 * @param {string} formName The form name
 * @returns {string} The equivalent AppClient for `formName` if it exists, undefined otherwise
 */
const getAppClient = formName => {
  const key = Object.keys(FormNames).find(e => FormNames[e] === formName);
  return AppClients[key];
};

/**
 * @function isValidForm
 * Checks if `form` is a valid form name
 * @param {string} form The form name
 * @returns {boolean} True if `form` is valid form
 */
const isValidForm = form => Object.values(FormNames).includes(form);

export { FormNames, ApiRoutes, AppClients, AppRoles, AppSettings, getAppClient, isValidForm };
