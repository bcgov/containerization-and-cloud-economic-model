import { appAxios } from '@/services/interceptors';

import { isValidForm } from '@/utils/constants';

/**
 * @function formAxios
 * Returns an Axios instance with auth header and preconfig if `form` is valid
 * @param {string} form The form name
 * @returns {object} An axios instance
 * @throws If `form` is not valid
 */
function formAxios(form) {
  if (!isValidForm(form)) throw new Error('Invalid form specified');
  return appAxios();
}

export default {
  //
  // Submissions
  //

  /**
   * @function getSubmission
   * Fetch the contents of a single attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId the guid of a submission in the database
   * @returns {Promise} An axios response
   */
  getSubmission(form, submissionId) {
    return formAxios(form).get(`${form}/submissions/${submissionId}`);
  },

  /**
   * @function sendSubmission
   * Sends a single attestation form submission
   * @param {string} form The form name
   * @param {object} content An object with business, contacts and attestation attributes
   * @returns {Promise} An axios response
   */
  sendSubmission(form, content) {
    return formAxios(form).post(`${form}/submissions`, content);
  },
};
