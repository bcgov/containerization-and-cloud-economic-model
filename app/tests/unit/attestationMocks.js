jest.mock('../../src/forms/attestations/dataService', () => {
  return {
    FormDataService: jest.fn().mockImplementation(() => {
      return {
        exists: jest.fn().mockResolvedValue(true),
        current: jest.fn().mockResolvedValue({current: true}),
        create: jest.fn().mockResolvedValue({create: true}),
        read: jest.fn().mockResolvedValue({read: true}),
        update: jest.fn().mockResolvedValue({update: true}),
        searchSubmissions: jest.fn().mockResolvedValue({searchSubmissions: true}),
        createSubmission: jest.fn().mockResolvedValue({createSubmission: true}),
        readSubmission: jest.fn().mockResolvedValue({readSubmission: true}),
        updateSubmission: jest.fn().mockResolvedValue({updateSubmission: true}),
        deleteSubmission: jest.fn().mockResolvedValue({deleteSubmission: true})
      };
    }),
    OperationTypesDataService: jest.fn().mockImplementation(() => {
      return {
        readTypes: jest.fn().mockResolvedValue({readTypes: true}),
        exists: jest.fn().mockResolvedValue(true),
        current: jest.fn().mockResolvedValue({current: true}),
        create: jest.fn().mockResolvedValue({create: true}),
        read: jest.fn().mockResolvedValue({read: true}),
        update: jest.fn().mockResolvedValue({update: true}),
        searchSubmissions: jest.fn().mockResolvedValue({searchSubmissions: true}),
        createSubmission: jest.fn().mockResolvedValue({createSubmission: true}),
        readSubmission: jest.fn().mockResolvedValue({readSubmission: true}),
        updateSubmission: jest.fn().mockResolvedValue({updateSubmission: true}),
        deleteSubmission: jest.fn().mockResolvedValue({deleteSubmission: true})
      };
    }),
  };
});

jest.mock('../../src/forms/attestations/emailService', () => {
  return {
    EmailService: jest.fn().mockImplementation(() => {
      return {
        sendConfirmationEmail: jest.fn().mockResolvedValue({sendConfirmationEmail: true}),
        sendSubmissionEmail: jest.fn().mockResolvedValue({sendSubmissionEmail: true}),
        sendStatusAssignmentEmail: jest.fn().mockResolvedValue({sendStatusAssignmentEmail: true}),
        sendAccessRequestedEmail: jest.fn().mockResolvedValue({sendAccessRequestedEmail: true})
      };
    }),
    OperationTypesEmailService: jest.fn().mockImplementation(() => {
      return {
        sendConfirmationEmail: jest.fn().mockResolvedValue({sendConfirmationEmail: true}),
        sendSubmissionEmail: jest.fn().mockResolvedValue({sendSubmissionEmail: true}),
        sendStatusAssignmentEmail: jest.fn().mockResolvedValue({sendStatusAssignmentEmail: true}),
        sendAccessRequestedEmail: jest.fn().mockResolvedValue({sendAccessRequestedEmail: true})
      };
    })
  };
});

jest.mock('../../src/forms/attestations/pdfService', () => {
  return {
    PdfService: jest.fn().mockImplementation(() => {
      return {
        generateSubmissionPdf: jest.fn().mockResolvedValue({
          headers: {
            'content-disposition': '1',
            'content-type': 'application/pdf',
            'content-length': '100',
            'content-transfer-encoding': 'utf-8'
          },
          data: {pdf: true}
        })
      };
    }),
  };
});
