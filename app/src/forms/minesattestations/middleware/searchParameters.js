const Problem = require('api-problem');
const Models = require('../models');

const isInt = x => {
  if (isNaN(x)) {
    return false;
  }
  const num = parseFloat(x);
  // use modulus to determine if it is an int
  return num % 1 === 0;
};

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

const verifyInt = (obj, param, result, errors) => {
  if (obj[param]) {
    if (isInt(obj[param])) {
      result[param] = parseInt(obj[param]);
    } else {
      errors.push(`${param} parameter must be an integer`);
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

const submissionSearch = async (req, res, next) => {
  try {
    const errors = [];
    const result = new Models.SubmissionSearch();
    req.searchParameters = result;
    if (req.query) {
      verifyInt(req.query, 'version', result, errors);
      ['confirmationId', 'business', 'city'].forEach(p => verifyString(req.query, p, result, errors));
      verifyBoolean(req.query, 'tiny', result, errors);
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

module.exports.submissionSearch = submissionSearch;
