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

class ConfirmSaveModal extends BaseAppPage {
  static at = { modalModule.isOpen(modalSelector) }
  static content = {
    modalSelector(wait:true) { $('#confirmSave') }

    okButton { $('button', type:'button', text:'OK') }
    cancelButton { $('button', type:'button', text:'Cancel') }
  }

  /**
   * Waits for the modal window to open.
   * Clicks the 'OK' button.
   *
   * @param checkClosed enable or disable checking if the modal closed.  This is often necessary if the modal closes
   *  slowly, and the test needs to wait for it to fully close before continuing.  If the modal triggers a change of
   *  page, this check should NOT be enabled as the modal reference is now stale, and cannot be accessed.
   *  (Optional, default: false)
   */
  void confirmSave(Boolean checkClosed=false) {
    modalModule.isOpen(modalSelector)
    okButton.click()
    if (checkClosed) {
      modalModule.isClosed()
    }
  }
}
