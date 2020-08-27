class Controller {
  constructor(dataService) {
    this._dataService = dataService;
  }

  async create(req, res, next){
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

  async update(req, res, next){
    try {
      const response = await this._dataService.update(req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next){
    try {
      const response = await this._dataService.read();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async current (req, res, next){
    try {
      const response = await this._dataService.current();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async searchSubmissions(req, res, next) {
    try {
      const response = await this._dataService.searchSubmissions(req.params);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createSubmission(req, res, next) {
    try {
      const response = await this._dataService.createSubmission(req.body, req.currentUser);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readSubmissionPublic(req, res, next){
    try {
      const response = await this._dataService.readSubmission(req.params.submissionId, true);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateSubmission (req, res, next) {
    try {
      const response = await this._dataService.updateSubmission(req.params.submissionId, req.body, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteSubmission (req, res, next) {
    try {
      const response = await this._dataService.deleteSubmission(req.params.submissionId, req.currentUser);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports.Controller = Controller;
