const Problem = require('api-problem');

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

const isBoolean = x => {
  return Object.prototype.toString.call(x) === '[object Boolean]';
};

const verifyString = (obj, param, result, errors) => {
  if (obj[param]) {
    if (isString(obj[param])) {
      result[param] = obj[param];
    } else {
      errors.push(`${param} parameter must be a string`);
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
    if (isBoolean(obj[param])) {
      result[param] = obj[param];
    } else if (isString(obj[param]) && ['true', 'false'].includes(obj[param].toLowerCase())) {
      result[param] = 'true' === obj[param].toLowerCase();
    } else {
      errors.push(`${param} parameter must be a boolean`);
    }
  }
};

const verifyInts = (obj, names, result, errors) => {
  names.forEach(p => verifyInt(obj, p, result, errors));
};

const verifyStrings = (obj, names, result, errors) => {
  names.forEach(p => verifyString(obj, p, result, errors));
};

const verifyBooleans = (obj, names, result, errors) => {
  names.forEach(p => verifyBoolean(obj, p, result, errors));
};

const submissionSearch = (models) => {
  return (req, res, next) => {
    try {
      const errors = [];
      const result = new models.SubmissionSearch();
      req.searchParameters = result;
      if (req.query) {
        verifyInts(req.query, result.ints, result, errors);
        verifyStrings(req.query, result.strings, result, errors);
        verifyBooleans(req.query, result.booleans, result, errors);
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
};

module.exports.submissionSearch = submissionSearch;
