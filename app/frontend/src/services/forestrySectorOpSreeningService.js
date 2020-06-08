import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function getTypes
   * Fetch a list of supported form types
   * @returns {Promise} An axios response
   */
  getTypes() {
    return appAxios().get(`${ApiRoutes.FORESTRYSECTOROPSCREENING}/types`);
  },

  /**
   * @function sendSubmission
   * Sends a submission
   * @param {object} content An object with business, contacts and attestation attributes
   * @returns {Promise} An axios response
   */
  sendSubmission(content) {
    return appAxios().post(`${ApiRoutes.FORESTRYSECTOROPSCREENING}/submissions`, content);
  }
};
