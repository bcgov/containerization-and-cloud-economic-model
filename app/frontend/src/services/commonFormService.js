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
    return formAxios(form).post(`${form}/submissions/email`, content);
  },

  //
  // Form
  //

  /**
   * @function getTypes
   * Fetch a list of supported form types
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  getTypes(form) {
    return formAxios(form).get(`${form}/types`);
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
    return formAxios(form).get(`${form}/submissions/${submissionId}/notes`);
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
    return formAxios(form).post(`${form}/submissions/${submissionId}/notes`, content);
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
    return formAxios(form).post(`${form}/submissions/${submissionId}/statuses/${statusId}/notes`, content);
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
    return formAxios(form).get(`${form}/settings`);
  },

  /**
   * @function getNamedSetting
   * Fetch the setting configuration under `name`
   * @param {string} form The form name
   * @param {string} name The namespace of the desired configuration
   * @returns {Promise} An axios response
   */
  getNamedSetting(form, name) {
    if (!name) throw new Error('Invalid name specified');
    return formAxios(form).get(`${form}/settings/${name}`);
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
    return formAxios(form).get(`${form}/current/statusCodes`);
  },

  /**
   * @function getStatusCodes
   * Fetch the contents of the Status Codes lookup table
   * @param {string} form The form name
   * @param {object} content An object containing the updated content for `form`
   * @returns {Promise} An axios response
   */
  updateStatusCodes(form, content) {
    return formAxios(form).put(`${form}/current/statusCodes`, content);
  },

  /**
   * @function getSubmissionStatuses
   * Fetch the inspection statuses of a specific attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId The guid of a submitted submissionId from the database
   * @returns {Promise} An axios response
   */
  getSubmissionStatuses(form, submissionId) {
    return formAxios(form).get(`${form}/submissions/${submissionId}/statuses`);
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
    return formAxios(form).post(`${form}/submissions/${submissionId}/statuses`, content);
  },

  //
  // Submissions
  //

  /**
   * @function getAllSubmissionData
   * Fetch the contents of all attestation submission metadata
   * @param {string} form The form name
   * @param {object} [params={}] Optional request parameters. Given an empty object, assume the following attribute defaults as endpoint behaviors
   * @param {boolean} [params.deleted=false] Set to true to include all deleted records
   * @param {boolean} [params.tiny=true] Set to false to get complete data
   * @returns {Promise} An axios response
   */
  getAllSubmissionData(form, params = {}) {
    return formAxios(form).get(`${form}/submissions`, { params });
  },

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
   * @function removeSubmission
   * Deletes a single attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId the guid of a submission in the database
   * @returns {Promise} An axios response
   */
  removeSubmission(form, submissionId) {
    return formAxios(form).delete(`${form}/submissions/${submissionId}`);
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

  /**
   * @function updateSubmission
   * Edits a single attestation form submission
   * @param {string} form The form name
   * @param {string} submissionId the guid of a submission in the database
   * @param {object} content An object containing the updated content for the `submissionId` form
   * @returns {Promise} An axios response
   */
  updateSubmission(form, submissionId, content) {
    return formAxios(form).put(`${form}/submissions/${submissionId}`, content);
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

    return formAxios(form).get(`${form}/team/roles`, { params });
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

    return formAxios(form).get(`${form}/team/users`, { params });
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
    return formAxios(form).put(`${form}/team/users/${user}/roles`, roleArray);
  },

  /**
   * @function requestTeamAccess
   * Sends a user request for a permission change
   * @param {string} form The form name
   * @returns {Promise} An axios response
   */
  requestTeamAccess(form) {
    return formAxios(form).post(`${form}/team/access`);
  }
};
