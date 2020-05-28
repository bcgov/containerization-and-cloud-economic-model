const keycloakAdminService = require('../../components').keycloakAdminService;

module.exports = {
  readUsers: async (req, res, next) => {
    try {
      const search = (req.query.search) ? req.query.search : undefined;
      const includeGroups = req.query.groups ? req.query.groups === 'true' : false;
      const response = await keycloakAdminService.findUsers(search, includeGroups);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  readUser: async (req, res, next) => {
    try {
      const includeGroups = req.query.groups ? req.query.groups === 'true' : false;
      const response = await keycloakAdminService.getUser(req.params.userId, includeGroups);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  readGroups: async (req, res, next) => {
    try {
      const search = (req.query.search) ? req.query.search : undefined;
      const includeUsers = req.query.users ? req.query.users === 'true' : false;
      const response = await keycloakAdminService.findGroups(search, includeUsers);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  readGroup: async (req, res, next) => {
    try {
      const includeUsers = req.query.users ? req.query.users === 'true' : false;
      const response = await keycloakAdminService.getGroup(req.params.groupId, includeUsers);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
};
