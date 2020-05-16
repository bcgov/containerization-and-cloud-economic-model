const Problem = require('api-problem');
const Models = require('../models');

const isString = x => {
  return Object.prototype.toString.call(x) === '[object String]';
};

const verifyString = (obj, param, result, errors) => {
  if (obj[param]) {
    if (isString(obj[param])) {
      result[param] = obj[param];
    } else {
      errors.push(`${param} parameter must be an string`);
    }
  }
};

const verifyBoolean = (obj, param, result, errors) => {
  if (obj[param]) {
    if (isString(obj[param]) && ['true','false'].includes(obj[param].toLowerCase())) {
      result[param] = 'true' === obj[param].toLowerCase();
    } else {
      errors.push(`${param} parameter must be a boolean`);
    }
  }
};

const formSearch = async (req, res, next) => {

  try {
    const errors = [];
    const result = new Models.FormSearch();
    req.searchParameters = result;
    if (req.query) {
      ['name', 'slug', 'keyword'].forEach(p => verifyString(req.query, p, result, errors));
      ['public', 'active'].forEach(p => verifyBoolean(req.query, p, result, errors));
    }
    if (errors.length) {
      const error = new Problem(422, {
        detail: 'Validation Error',
        errors: errors
      });
      return next(error);
    }
  } catch (err) {
    return next(err);
  }
  next();
};

module.exports.formSearch = formSearch;
