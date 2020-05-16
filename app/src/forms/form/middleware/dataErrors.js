const Problem = require('api-problem');
const Objection = require('objection');

module.exports = async (err, req, res, next) => {
  let error = err;
  if (err instanceof Objection.NotFoundError) {
    error = new Problem(422, {
      detail: 'Not Found',
      errors: err.message
    });
  } else if (err instanceof Objection.ValidationError) {
    error = new Problem(422, {
      detail: 'Validation Error',
      errors: err.data
    });
  }
  next(error);
};
