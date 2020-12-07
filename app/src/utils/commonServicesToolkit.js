// Requires
const axios = require('axios').default;

// Get token from DocGen SSO
function getToken(url, clientId, clientSecret) {
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
exports.getToken = getToken;
