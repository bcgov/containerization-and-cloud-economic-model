// Requires
const axios = require('axios').default;
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
      throw err;
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

// Get token from DocGen SSO
function csToken(url, clientId, clientSecret) {
  // URL query string and config with headers
  const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  // Return access token from response
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data.access_token);
      })
      .catch((err) => {
        reject(err.response.statusText);
      });
  });
}

// Exports
exports.getContexts = getContexts;
exports.carboneRun = carboneRun;
exports.carboneRunPaths = carboneRunPaths;
exports.csToken = csToken;
