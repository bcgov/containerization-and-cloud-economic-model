import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function getTypes
   * Fetch a list of supported form types
   * @returns {Promise} An axios response
   */
  getTypes() {
    return appAxios().get(`${ApiRoutes.AGRISEAFOODOPSCREENING}/types`);
  },

  /**
   * @function sendSubmission
   * Sends a submission
   * @param {object} content An object with business, contacts and attestation attributes
   * @returns {Promise} An axios response
   */
  sendSubmission(content) {
    return appAxios().post(`${ApiRoutes.AGRISEAFOODOPSCREENING}/submissions`, content);
  },

  /**
   * @function getSubmission
   * Fetch the contents of a single attestation form submission
   * @param {string} ipcPlanId the guid of a submission from the database
   * @returns {Promise} An axios response
   */
  getSubmission(submissionId) {
    return appAxios().get(`${ApiRoutes.AGRISEAFOODOPSCREENING}/submissions/${submissionId}`);
  }
};
