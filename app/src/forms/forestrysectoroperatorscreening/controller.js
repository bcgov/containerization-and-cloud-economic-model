class Controller {
  constructor(commonDataService, dataService, emailService, pdfService) {
    this._commonDataService = commonDataService;
    this._dataService = dataService;
    this._emailService = emailService;
    this._pdfService = pdfService;
  }

  async readTypes(req, res, next) {
    try {
      const enabled = ['true', 'false'].includes(req.query.enabled) ? req.query.enabled === 'true' : undefined;
      const response = await this._dataService.readTypes(enabled);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // there can be only 1!
      let response = await this._dataService.exists();
      if (response) {
        response = await this._dataService.read();
        res.status(302).json(response);
      } else {
        response = await this._dataService.create(req.body, req.currentUser);
        res.status(201).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const response = await this._dataService.update(req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
    try {
      const response = await this._dataService.read();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      const response = await this._dataService.current();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async searchSubmissions(req, res, next) {
    try {
      const response = await this._dataService.searchSubmissions(req.searchParameters);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSubmission(req, res, next) {
    try {
      const response = await this._dataService.createSubmission(req.body);
      // don't await here...
      this._emailService.sendConfirmationEmail(response);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSubmissionPublic(req, res, next) {
    try {
      const response = await this._dataService.readSubmission(req.params.submissionId, true);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async generateSubmissionPdf(req, res, next) {
    try {
      const submission = await this._dataService.readSubmission(req.params.submissionId);
      const result = await this._pdfService.generateSubmissionPdf(submission);
      ['Content-Disposition', 'Content-Type', 'Content-Length', 'Content-Transfer-Encoding'].forEach(h => {
        res.setHeader(h, result.headers[h.toLowerCase()]);
      });
      return res.send(result.data);
    } catch (err) {
      next(err);
    }
  }

  async updateSubmission(req, res, next) {
    try {
      const response = await this._dataService.updateSubmission(req.params.submissionId, req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteSubmission(req, res, next) {
    try {
      const response = await this._dataService.deleteSubmission(req.params.submissionId, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async sendSubmissionEmail(req, res, next) {
    try {
      const submission = await this._dataService.readSubmission(req.body.submissionId);
      const result = await this._emailService.sendSubmissionEmail(submission, req.body.to);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
