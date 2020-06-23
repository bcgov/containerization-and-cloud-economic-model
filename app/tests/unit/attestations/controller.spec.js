const Problem = require('api-problem');

// mock services...
require('../attestationMocks');

const Controller = require('../../../src/forms/attestations/controller').Controller;
const OperationTypesController = require('../../../src/forms/attestations/controller').OperationTypesController;
const FormDataService = require('../../../src/forms/attestations/dataService').FormDataService;
const OperationTypesDataService = require('../../../src/forms/attestations/dataService').OperationTypesDataService;
const EmailService = require('../../../src/forms/attestations/emailService').EmailService;
const PdfService = require('../../../src/forms/attestations/pdfService').PdfService;

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockPdfResponse = () => {
  const res = {};
  res.setHeader = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test OperationTypesController', () => {

  let controller;
  let dataService;
  let emailService;
  let pdfService;

  beforeAll(() => {
    dataService = new OperationTypesDataService();
    emailService = new EmailService();
    pdfService = new PdfService();
    controller = new OperationTypesController(dataService, emailService, pdfService);
  });

  it('should list file types', async () => {

    const mockRequest = (enabled) => new Object({query: {enabled: enabled}});

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.readTypes(mockRequest('true'), res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.readTypes).toHaveBeenCalledWith(true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({readTypes: true});

    await controller.readTypes(mockRequest('false'), res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.readTypes).toHaveBeenCalledWith(false);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({readTypes: true});

  });

});

describe('Test Controller', () => {

  let controller;
  let dataService;
  let emailService;
  let pdfService;

  beforeAll(() => {
    dataService = new FormDataService();
    emailService = new EmailService();
    pdfService = new PdfService();
    controller = new Controller(dataService, emailService, pdfService);
  });

  it('creates form - redirects when form exists', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.create({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.exists).toHaveBeenCalledTimes(1);
    expect(dataService.read).toHaveBeenCalledTimes(1);
    expect(dataService.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(302);
    expect(res.json).toHaveBeenCalledWith({read: true});

  });

  it('creates form - adds when form does not exist', async () => {

    dataService.exists = jest.fn().mockResolvedValue(null);

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.create({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.exists).toHaveBeenCalledTimes(1);
    expect(dataService.read).not.toHaveBeenCalled();
    expect(dataService.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({create: true});

  });

  it('reads form', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.read({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.read).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({read: true});

  });

  it('updates form', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.update({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.update).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({update: true});

  });

  it('gets current form', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.current({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.current).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({current: true});

  });

  it('searches for submissions', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.searchSubmissions({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.searchSubmissions).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({searchSubmissions: true});

  });

  it('creates submissions', async () => {

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.createSubmission({}, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.createSubmission).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({createSubmission: true});
  });

  it('reads (public) submissions', async () => {

    const req = {
      params: {
        submissionId: '1'
      }
    };

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.readSubmissionPublic(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.readSubmission).toHaveBeenCalledTimes(1);
    expect(dataService.readSubmission).toHaveBeenCalledWith('1', true);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({readSubmission: true});
  });

  it('generates pdf', async () => {

    const req = {
      params: {
        submissionId: '1'
      }
    };

    const res = mockPdfResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.generateSubmissionPdf(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.readSubmission).toHaveBeenCalledTimes(1);
    expect(dataService.readSubmission).toHaveBeenCalledWith('1');
    expect(res.send).toHaveBeenCalledWith({pdf: true});
    expect(res.setHeader).toHaveBeenCalledTimes(4);
  });

  it('updates submission', async () => {

    const req = {
      params: {
        submissionId: '1',
      },
      body: {},
      currentUser: {}
    };

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.updateSubmission(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.updateSubmission).toHaveBeenCalledTimes(1);
    expect(dataService.updateSubmission).toHaveBeenCalledWith('1', {}, {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({updateSubmission: true});
  });

  it('deletes submission', async () => {

    const req = {
      params: {
        submissionId: '1',
      },
      currentUser: {}
    };

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.deleteSubmission(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.deleteSubmission).toHaveBeenCalledTimes(1);
    expect(dataService.deleteSubmission).toHaveBeenCalledWith('1', {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({deleteSubmission: true});
  });

  it('sends submission email', async () => {

    const req = {
      body: {
        submissionId: '1',
        to: 'fake@email'
      }
    };

    const res = mockResponse();

    const next = {
      handler: (p) => {
        next.problem = p;
      }
    };

    await controller.sendSubmissionEmail(req, res, next.handler);
    expect(next.problem).toBeUndefined();
    expect(dataService.readSubmission).toHaveBeenCalledTimes(1);
    expect(dataService.readSubmission).toHaveBeenCalledWith('1');
    expect(emailService.sendSubmissionEmail).toHaveBeenCalledTimes(1);
    expect(emailService.sendSubmissionEmail).toHaveBeenCalledWith({readSubmission: true}, req.body.to);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({sendSubmissionEmail: true});
  });


  describe('error handling - forwards Errors to next', () => {
    it('creates', async () => {

      dataService.exists = jest.fn(() => {
        throw new Error('create error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.create({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('create error');
    });

    it('reads', async () => {

      dataService.read = jest.fn(() => {
        throw new Error('read error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.read({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('read error');
    });

    it('updates', async () => {

      dataService.update = jest.fn(() => {
        throw new Error('update error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.update({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('update error');
    });

    it('gets current', async () => {

      dataService.current = jest.fn(() => {
        throw new Error('current error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.current({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('current error');
    });

    it('searches for submissions', async () => {

      dataService.searchSubmissions = jest.fn(() => {
        throw new Error('search error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.searchSubmissions({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('search error');
    });

    it('creates submissions', async () => {

      dataService.createSubmission = jest.fn(() => {
        throw new Error('create submission error');
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.createSubmission({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('create submission error');
    });

    it('reads (public) submissions', async () => {

      dataService.readSubmission = jest.fn(() => {
        throw new Error('read submission error');
      });

      const req = {
        params: {
          submissionId: '1'
        }
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.readSubmissionPublic(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('read submission error');
    });

    it('updates submission', async () => {

      dataService.updateSubmission = jest.fn(() => {
        throw new Error('update submission error');
      });

      const req = {
        params: {
          submissionId: '1',
        },
        body: {},
        currentUser: {}
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.updateSubmission(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('update submission error');
    });

    it('deletes submission', async () => {

      dataService.deleteSubmission = jest.fn(() => {
        throw new Error('delete submission error');
      });

      const req = {
        params: {
          submissionId: '1',
        },
        currentUser: {}
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.deleteSubmission(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('delete submission error');
    });

    it('sends submission email', async () => {

      dataService.readSubmission = jest.fn().mockResolvedValue({readSubmission: true});
      emailService.sendSubmissionEmail = jest.fn(() => {
        throw new Error('send email error');
      });

      const req = {
        body: {
          submissionId: '1',
          to: 'fake@email'
        }
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.sendSubmissionEmail(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Error);
      expect(next.problem.message).toBe('send email error');
    });

  });

  describe('error handling - forwards Problems to next', () => {
    it('creates', async () => {

      dataService.exists = jest.fn(() => {
        throw new Problem(404, {detail: 'create error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.create({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('create error');
    });

    it('reads', async () => {

      dataService.read = jest.fn(() => {
        throw new Problem(404, {detail: 'read error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.read({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('read error');
    });

    it('updates', async () => {

      dataService.update = jest.fn(() => {
        throw new Problem(404, {detail: 'update error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.update({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('update error');
    });

    it('gets current', async () => {

      dataService.current = jest.fn(() => {
        throw new Problem(404, {detail: 'current error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.current({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('current error');
    });

    it('searches for submissions', async () => {

      dataService.searchSubmissions = jest.fn(() => {
        throw new Problem(404, {detail: 'search error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.searchSubmissions({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('search error');
    });

    it('creates submissions', async () => {

      dataService.createSubmission = jest.fn(() => {
        throw new Problem(404, {detail: 'create submission error'});
      });

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.createSubmission({}, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('create submission error');
    });

    it('reads (public) submissions', async () => {

      dataService.readSubmission = jest.fn(() => {
        throw new Problem(404, {detail: 'read submission error'});
      });

      const req = {
        params: {
          submissionId: '1'
        }
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.readSubmissionPublic(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('read submission error');
    });

    it('updates submission', async () => {

      dataService.updateSubmission = jest.fn(() => {
        throw new Problem(404, {detail: 'update submission error'});
      });

      const req = {
        params: {
          submissionId: '1',
        },
        body: {},
        currentUser: {}
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.updateSubmission(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('update submission error');
    });

    it('deletes submission', async () => {

      dataService.deleteSubmission = jest.fn(() => {
        throw new Problem(404, {detail: 'delete submission error'});
      });

      const req = {
        params: {
          submissionId: '1',
        },
        currentUser: {}
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.deleteSubmission(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('delete submission error');
    });

    it('sends submission email', async () => {

      dataService.readSubmission = jest.fn().mockResolvedValue({readSubmission: true});
      emailService.sendSubmissionEmail = jest.fn(() => {
        throw new Problem(404, {detail: 'send email error'});
      });

      const req = {
        body: {
          submissionId: '1',
          to: 'fake@email'
        }
      };

      const res = mockResponse();

      const next = {
        handler: (p) => {
          next.problem = p;
        }
      };

      await controller.sendSubmissionEmail(req, res, next.handler);
      expect(next.problem).toBeInstanceOf(Problem);
      expect(next.problem.detail).toBe('send email error');
    });
  });

});
