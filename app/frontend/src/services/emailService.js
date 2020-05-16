import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function requestReceiptEmail
   * Sends an application registration request email
   * @param {object} content An object with ipcPlanId and to attributes
   * @returns {Promise} An axios response
   */
  requestReceiptEmail(content) {
    return appAxios().post(ApiRoutes.EMAIL, content);
  }
};
