jest.mock('../../src/forms/common/dataService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      current: jest.fn().mockResolvedValue({current: true}),
      createSubmissionStatus: jest.fn().mockResolvedValue({createSubmissionStatus: true}),
      readSubmissionStatuses: jest.fn().mockResolvedValue({readSubmissionStatuses: true}),
      createSubmissionStatusNote: jest.fn().mockResolvedValue({createSubmissionStatusNote: true}),
      readSubmissionStatusNotes: jest.fn().mockResolvedValue({readSubmissionStatusNotes: true}),
      createSubmissionNote: jest.fn().mockResolvedValue({createSubmissionNote: true}),
      readSubmissionNotes: jest.fn().mockResolvedValue({readSubmissionNotes: true}),
      readCurrentStatusCodes: jest.fn().mockResolvedValue({readCurrentStatusCodes: true}),
      getSubmission: jest.fn().mockResolvedValue({getSubmission: true}),
      updateCurrentStatusCodes: jest.fn().mockResolvedValue({updateCurrentStatusCodes: true}),
      createSettings: jest.fn().mockResolvedValue({createSettings: true}),
      updateSettings: jest.fn().mockResolvedValue({updateSettings: true}),
      readSettings: jest.fn().mockResolvedValue({readSettings: true}),
      allSettings: jest.fn().mockResolvedValue({allSettings: true})
    };
  });
});

jest.mock('../../src/forms/common/middleware/auth', () => {
  return {
    currentUser: jest.fn((req, res, next) => next()),
    hasRole: jest.fn(() => {
      // the hasRole middleware actually returns a middleware function itself, so we need to do that here.
      return jest.fn((req, res, next) => next());
    })
  };
});
