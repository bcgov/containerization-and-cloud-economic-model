import { appAxios } from '@/services/interceptors';

export default {
  //
  // Email
  //

  /**
   * @function requestReceiptEmail
   * Sends an application registration request email
   * @param {string} form The form name
   * @param {object} content An object with submissionId and to attributes
   * @returns {Promise} An axios response
   */
  requestReceiptEmail(form, content) {
    return appAxios().post(`${form}/submissions/email`, content);
  },

  //
  // Team Management
  //

  /**
   * @function getTeamRoles
   * Fetches a list of valid team roles for `form`.
   * @param {string} form The form name
   * @param {boolean} [users=false] Populate response with users
   * @returns {Promise} An axios response
   */
  getTeamRoles(form, users = false) {
    const params = {};
    if (users) params.users = true;
    return appAxios().get(`${form}/team/roles`, { params });
  },

  /**
   * @function getTeamUsers
   * Fetches a list of associated users for `form`.
   * @param {string} form The form name
   * @param {boolean} [roles=false] Populate response with roles
   * @returns {Promise} An axios response
   */
  getTeamUsers(form, roles = false) {
    const params = {};
    if (roles) params.roles = true;
    return appAxios().get(`${form}/team/users`, { params });
  },

  /**
   * @function updateTeamUserRole
   * Updates `user` to have `role` for `form`.
   * @param {string} form The form name
   * @param {string} user The user uuid
   * @param {object[]} roleArray The desired composite role. Removes `user` from all roles if empty.
   * @returns {Promise} An axios response
   */
  updateTeamUserRole(form, user, roleArray) {
    return appAxios().put(`${form}/team/users/${user}/roles`, roleArray);
  },

  /**
   * @function requestTeamAccess
   * Sends a user request for a permission change
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  requestTeamAccess(form) {
    return appAxios().post(`${form}/team/access`);
  }
};
