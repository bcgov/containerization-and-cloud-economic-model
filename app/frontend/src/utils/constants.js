const FormNames = Object.freeze({
  AGRISEAFOODOPSCREENING: 'agriseafoodopscreening',
  FORESTRYSECTOROPSCREENING: 'forestrysectoropscreening',
  MINESOPERATORSCREENING: 'minesoperatorscreening'
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

const AppRoles = Object.freeze({
  ADMIN: 'admin',
  EDITOR: 'editor',
  REVIEWER: 'reviewer',
  USER: 'user',
  VIEWER: 'viewer'
});

export { FormNames, ApiRoutes, AppClients, AppRoles };
