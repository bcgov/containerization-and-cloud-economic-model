const FormNames = Object.freeze({
  AGRISEAFOODOPSCREENING: 'agriseafoodopscreening',
  FORESTRYSECTOROPSCREENING: 'forestrysectoropscreening',
  MINESOPERATORSCREENING: 'minesoperatorscreening'
});

const ApiRoutes = Object.freeze({
  AGRISEAFOODOPSCREENING: `/${FormNames.AGRISEAFOODOPSCREENING}`,
  FORESTRYSECTOROPSCREENING: `/${FormNames.FORESTRYSECTOROPSCREENING}`,
  MINESOPERATORSCREENING: `/${FormNames.MINESOPERATORSCREENING}`
});

const AppClients = Object.freeze({
  APP: 'comfort',
  AGRISEAFOODOPSCREENING: `comfort-${FormNames.AGRISEAFOODOPSCREENING}`,
  FORESTRYSECTOROPSCREENING: `comfort-${FormNames.FORESTRYSECTOROPSCREENING}`,
  MINESOPERATORSCREENING: `comfort-${FormNames.MINESOPERATORSCREENING}`
});

const AppRoles = Object.freeze({
  ADMIN: 'admin',
  EDITOR: 'editor',
  REVIEWER: 'reviewer',
  USER: 'user',
  VIEWER: 'viewer'
});

export { FormNames, ApiRoutes, AppClients, AppRoles };
