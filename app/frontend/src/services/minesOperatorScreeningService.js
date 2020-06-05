import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

export default {
  /**
   * @function getAllSubmissionData
   * Fetch the contents of all attestation submissions
   * @returns {Promise} An axios response
   */
  getAllSubmissionData() {
    return appAxios().get(`${ApiRoutes.MINESOPERATORSCREENING}/submissions`);
  },

  /**
   * @function getAllSubmissionMetaData
   * Fetch only the basic meta data of all attestation submissions
   * @returns {Promise} An axios response
   */
  getAllSubmissionMetaData() {
    return appAxios().get(`${ApiRoutes.MINESOPERATORSCREENING}/submissions`, { params: { tiny: true } });
  },

  /**
   * @function sendSubmission
   * Sends a submission
   * @param {object} content An object with business, contacts and attestation attributes
   * @returns {Promise} An axios response
   */
  sendSubmission(content) {
    return appAxios().post(`${ApiRoutes.MINESOPERATORSCREENING}/submissions`, content);
  },

  /**
   * @function getSubmission
   * Fetch the contents of a single attestation form submission
   * @param {string} ipcPlanId the guid of a submission from the database
   * @returns {Promise} An axios response
   */
  getSubmission(submissionId) {
    return appAxios().get(`${ApiRoutes.MINESOPERATORSCREENING}/submissions/${submissionId}`);
  },

  /**
   * @function getNotes
   * Fetch the notes of a specific submission
   * @param {string} submissionId The guid of a submitted submissionId from the database
   * @returns {Promise} An axios response
   */
  getNotes(submissionId) {
    return appAxios().get(`${ApiRoutes.MINESOPERATORSCREENING}/submissions/${submissionId}/notes`);
  },

  /**
   * @function addNote
   * Add a note of a specific form submission
   * @param {string} submissionId The guid of a submitted form from the database
   * @param {object} content An object representing the note
   * @returns {Promise} An axios response
   */
  addNote(submissionId, content) {
    return appAxios().post(`${ApiRoutes.MINESOPERATORSCREENING}/submissions/${submissionId}/notes`, content);
  }
};
