// Requires
const fs = require('fs');
const carbone = require('carbone');

/**
 * @function carboneRun
 * Uses carbone to complete a template using contexts object
 * @param {string} tf path to template file
 * @param {object} contexts JSON contexts (data)
 * @param {string} of path to output file
 * @returns {boolean} True if `form` is valid form
 */
function carboneRun(tf, contexts, of) {
  carbone.render(tf, contexts, function (err, result) {
    if (err) {
      throw (err);
    }
    fs.writeFileSync(of, result);
  });
}

/**
 * @function carboneRunPaths
 * Uses carbone to complete a template using contexts file
 * @param {string} tf path to template file
 * @param {object} cf path to contexts file
 * @param {string} of path to output file
 * @returns {boolean} True if `form` is valid form
 */
function carboneRunPaths(tf, cf, of) {
  carboneRun(tf, getContexts(cf), of);
}

// Get parsed contexts
function getContexts(cf) {
  return JSON.parse(fs.readFileSync(cf, 'utf8'));
}

// Exports
exports.getContexts = getContexts;
exports.carboneRun = carboneRun;
exports.carboneRunPaths = carboneRunPaths;
