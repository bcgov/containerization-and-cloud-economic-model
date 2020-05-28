const Service = require('./service');

class Controller {
  constructor(resourceAccess) {
    this._service = new Service(resourceAccess);
  }

  async readUsers(req, res, next) {
    try {
      const search = (req.query.search) ? req.query.search : undefined;
      const response = await this._service.getUsers(search);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readUser(req, res, next) {
    try {
      const response = await this._service.getUser(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readGroups(req, res, next){
    try {
      const includeUsers = req.query.users ? req.query.users === 'true' : false;
      const response = await this._service.getGroups(includeUsers);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async readGroup(req, res, next) {
    try {
      const includeUsers = req.query.users ? req.query.users === 'true' : false;
      const response = await this._service.getGroup(req.params.groupId, includeUsers);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
