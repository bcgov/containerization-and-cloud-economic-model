import { appAxios } from '@/services/interceptors';

export default {
  /**
   * @function getTeamRoles
   * Fetches a list of valid team roles for `form`.
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  getTeamRoles(form) {
    return appAxios().get(`${form}/team/roles`);
  },

  /**
   * @function requestTeamAccess
   * Sends a user request for a permission change
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  requestTeamAccess(form) {
    return appAxios().post(`${form}/team/access`);
  },

  /**
   * @function requestReceiptEmail
   * Sends an application registration request email
   * @param {string} form The form name
   * @param {object} content An object with submissionId and to attributes
   * @returns {Promise} An axios response
   */
  requestReceiptEmail(form, content) {
    return appAxios().post(`${form}/submissions/email`, content);
  }
};
