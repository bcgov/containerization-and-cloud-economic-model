import { appAxios } from '@/services/interceptors';
import { isValidForm } from '@/utils/constants';

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
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().post(`${form}/submissions/email`, content);
  },

  //
  // Notes
  //

  /**
   * @function getNotes
   * Fetch the notes of a specific submission
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted submissionId from the database
   * @returns {Promise} An axios response
   */
  getNotes(form, submissionId) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().get(`${form}/submissions/${submissionId}/notes`);
  },

  /**
   * @function addNote
   * Add a note of a specific form submission
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted form from the database
   * @param {object} content An object representing the note
   * @returns {Promise} An axios response
   */
  addNote(form, submissionId, content) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().post(`${form}/submissions/${submissionId}/notes`, content);
  },

  /**
   * @function addNoteToStatus
   * Add a note of a specific form submission on a specific status update
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted form from the database
   * @param {string} statusId The guid of a status record from the database
   * @param {object} content An object representing the note
   * @returns {Promise} An axios response
   */
  addNoteToStatus(form, submissionId, statusId, content) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().post(`${form}/submissions/${submissionId}/statuses/${statusId}/notes`, content);
  },

  //
  // Settings
  //

  /**
   * @function getSettings
   * Fetch this form's settings
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  getSettings(form) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().get(`${form}/settings`);
  },

  /**
   * @function getDashboardSettings
   * Fetch a list of dashboard setting configurations
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  getDashboardSettings(form) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().get(`${form}/settings/dashboards`);
  },

  //
  // Statuses
  //

  /**
   * @function getStatusCodes
   * Fetch the contents of the Status Codes lookup table
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  getStatusCodes(form) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().get(`${form}/current/statusCodes`);
  },

  /**
   * @function getSubmissionStatuses
   * Fetch the inspection statuses of a specific attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted submissionId from the database
   * @returns {Promise} An axios response
   */
  getSubmissionStatuses(form, submissionId) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().get(`${form}/submissions/${submissionId}/statuses`);
  },

  /**
   * @function sendSubmissionStatuses
   * Update the statuses of a specific attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted submission from the database
   * @param {object} content An object representing the updated status for the `submissionId` form
   * @returns {Promise} An axios response
   */
  sendSubmissionStatuses(form, submissionId, content) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().post(`${form}/submissions/${submissionId}/statuses`, content);
  },

  //
  // Submissions
  //

  /**
   * @function getAllSubmissionData
   * Fetch the contents of all attestation submissions
   * @param {string} form The form name
   * @param {boolean} [metaOnly=false] Request only basic metadata
   * @returns {Promise} An axios response
   */
  getAllSubmissionData(form, metaOnly = false) {
    const params = {};

    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    if (metaOnly) params.tiny = true;

    return appAxios().get(`${form}/submissions`, { params });
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

    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
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

    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
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
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().put(`${form}/team/users/${user}/roles`, roleArray);
  },

  /**
   * @function requestTeamAccess
   * Sends a user request for a permission change
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  requestTeamAccess(form) {
    if (!isValidForm(form)) return Promise.reject('Invalid form specified');
    return appAxios().post(`${form}/team/access`);
  }
};
