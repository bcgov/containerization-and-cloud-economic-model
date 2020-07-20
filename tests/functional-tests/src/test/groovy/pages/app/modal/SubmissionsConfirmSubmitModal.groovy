/* Copyright 2020 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

package pages

class SubmissionsConfirmSubmitModal extends BaseAppPage {
  static at = { modalModule.isOpen(modalSelector) }
  static content = {
    modalSelector(wait:true) { $('#confirmSubmitModal') }

    saveButton { $('button', type:'button', text:'Save') }
    cancelButton { $('button', type:'button', text:'Cancel') }
  }

  /**
   * Waits for the modal window to open.
   * Clicks the 'Delete' button.
   * Waits for the modal window to close.
   */
  void confirmSubmit() {
    modalModule.isOpen(modalSelector)
    saveButton.click()
    modalModule.isClosed(modalSelector)
  }
}
