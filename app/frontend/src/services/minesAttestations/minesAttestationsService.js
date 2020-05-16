import { appAxios } from './node_modules/@/services/interceptors';
import { ApiRoutes } from './node_modules/@/utils/constants';

export default {
  /**
   * @function getAllSubmissionData
   * Fetch the contents of all attestation submissions
   * @returns {Promise} An axios response
   */
  getAllSubmissionData() {
    return appAxios().get(ApiRoutes.IPC);
  },

  /**
   * @function getAllSubmissionMetaData
   * Fetch only the basic meta data of all attestation submissions
   * @returns {Promise} An axios response
   */
  getAllIPCMetaDagetAllSubmissionMetaDatata() {
    return appAxios().get(ApiRoutes.IPC, { params: { meta: true } });
  },

  /**
   * @function sendSubmission
   * Sends a submission
   * @param {object} content An object with business, contacts and attestation attributes
   * @returns {Promise} An axios response
   */
  sendSubmission(content) {
    return appAxios().post(ApiRoutes.IPC, content);
  },

  /**
   * @function getSubmission
   * Fetch the contents of a single attestation form submission
   * @param {string} ipcPlanId the guid of a submission from the database
   * @returns {Promise} An axios response
   */
  getSubmission(ipcPlanId) {
    return appAxios().get(`${ApiRoutes.IPC}/${ipcPlanId}`);
  },

  /**
   * @function getSubmissionStatuses
   * Fetch the inspection statuses of a specific IPC form submission
   * @param {string} ipcPlanId The guid of a submitted ipcplan from the database
   * @returns {Promise} An axios response
   */
  getIPCInspectionStatuses(ipcPlanId) {
    return appAxios().get(`${ApiRoutes.IPC}/${ipcPlanId}/status`);
  },

  /**
   * @function sendIPCInspectionStatuses
   * Update the inspection statuses of a specific IPC form submission
   * @param {string} ipcPlanId The guid of a submitted ipcplan from the database
   * @param {object} content An object representing the updated status for the `ipcPlanId` form
   * @returns {Promise} An axios response
   */
  sendIPCInspectionStatuses(ipcPlanId, content) {
    return appAxios().post(`${ApiRoutes.IPC}/${ipcPlanId}/status`, content);
  },

  /**
   * @function getNotes
   * Fetch the notes of a specific IPC form submission
   * @param {string} ipcPlanId The guid of a submitted ipcplan from the database
   * @returns {Promise} An axios response
   */
  getNotes(ipcPlanId) {
    return appAxios().get(`${ApiRoutes.IPC}/${ipcPlanId}/notes`);
  },

  /**
   * @function addNote
   * Add a note of a specific IPC form submission
   * @param {string} ipcPlanId The guid of a submitted ipcplan from the database
   * @param {object} content An object representing the note
   * @returns {Promise} An axios response
   */
  addNote(ipcPlanId, content) {
    return appAxios().post(`${ApiRoutes.IPC}/${ipcPlanId}/notes`, content);
  },

};
