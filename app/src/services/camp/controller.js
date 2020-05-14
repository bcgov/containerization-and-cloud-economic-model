const DataService = require('./dataService');

const getService = () => {
  const dataService = new DataService();
  return dataService;
};

module.exports = {
  create: async (req, res, next) => {
    const svc = getService();
    try {
      const createdBy ='this gets replaced with token value';
      const response = await svc.create(req.body, createdBy);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
  read: async (req, res, next) => {
    const svc = getService();
    try {
      let formId = req.params.formId;
      const response = await svc.read(formId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
  all:  async (req, res, next) => {
    const svc = getService();
    try {
      const response = await svc.all();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
};
