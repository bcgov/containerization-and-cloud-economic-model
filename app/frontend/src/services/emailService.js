import { appAxios } from '@/services/interceptors';

export default {
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
