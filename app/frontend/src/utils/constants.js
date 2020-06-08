// Registered Form Names
const FormNames = Object.freeze({
  AGRISEAFOODOPSCREENING: 'agriseafoodopscreening',
  FORESTRYSECTOROPSCREENING: 'forestrysectoropscreening',
  MINESOPERATORSCREENING: 'minesoperatorscreening'
});

/**
 * @function isValidForm
 * Checks if `form` is a valid form name
 * @param {string} form The form name
 * @returns {boolean} True if `form` is valid form
 */
const isValidForm = form => Object.values(FormNames).includes(form);

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

export { FormNames, isValidForm, ApiRoutes, AppClients, AppRoles };
