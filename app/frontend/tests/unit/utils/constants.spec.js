import * as constants from '@/utils/constants';

describe('FormNames', () => {
  it('is defined correctly', () => {
    expect(constants.FormNames).toBeTruthy();
    expect(constants.FormNames).toMatchObject({
      AGRISEAFOODOPSCREENING: 'agriseafoodopscreening',
      FORESTRYSECTOROPSCREENING: 'forestrysectoropscreening',
      MINESOPERATORSCREENING: 'minesoperatorscreening'
    });
  });
});

describe('isValidForm', () => {
  it('returns true when value is in FormNames', () => {
    expect(constants.isValidForm('minesoperatorscreening')).toBeTruthy();
  });

  it('returns false when value is not in FormNames', () => {
    expect(constants.isValidForm('garbage')).toBeFalsy();
  });
});

describe('ApiRoutes', () => {
  it('is defined correctly', () => {
    expect(constants.ApiRoutes).toBeTruthy();
    expect(constants.ApiRoutes).toMatchObject({
      AGRISEAFOODOPSCREENING: '/agriseafoodopscreening',
      FORESTRYSECTOROPSCREENING: '/forestrysectoropscreening',
      MINESOPERATORSCREENING: '/minesoperatorscreening'
    });
  });
});

describe('AppClients', () => {
  it('is defined correctly', () => {
    expect(constants.AppClients).toBeTruthy();
    expect(constants.AppClients).toMatchObject({
      APP: 'comfort',
      AGRISEAFOODOPSCREENING: 'comfort-agriseafoodopscreening',
      FORESTRYSECTOROPSCREENING: 'comfort-forestrysectoropscreening',
      MINESOPERATORSCREENING: 'comfort-minesoperatorscreening'
    });
  });
});

describe('AppRoles', () => {
  it('is defined correctly', () => {
    expect(constants.AppRoles).toBeTruthy();
    expect(constants.AppRoles).toMatchObject({
      ADMIN: 'admin',
      EDITOR: 'editor',
      REVIEWER: 'reviewer',
      USER: 'user',
      VIEWER: 'viewer'
    });
  });
});

describe('AppSettings', () => {
  it('is defined correctly', () => {
    expect(constants.AppSettings).toBeTruthy();
    expect(constants.AppSettings).toMatchObject({
      DASHBOARD: 'dashboards',
      EMAILACCESSREQUESTED: 'accessRequestedEmail',
      EMAILCONFIRMATION: 'confirmationEmail',
      EMAILSTATUSASSIGNMENT: 'statusAssignmentEmail',
      EMAILSUBMISSION: 'submissionEmail',
      GENERATESUBMISSIONPDF: 'generateSubmissionPdf'
    });
  });
});
