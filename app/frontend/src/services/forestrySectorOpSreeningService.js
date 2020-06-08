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
  }
};
