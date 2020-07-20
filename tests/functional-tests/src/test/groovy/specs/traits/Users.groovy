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

package specs.traits

/**
 * Methods to manage user credentials.
 */
trait Users {
  Map env = System.getenv()
  Map getNoneUser() {
    [username:env['CSSTROL1_ID'], password:env['CSSTROL1_PW']]
  }
  Map getViewerUser() {
    [username:env['CSSTROL2_ID'], password:env['CSSTROL2_PW']]
  }
  Map getReviewerUser() {
    [username:env['CSSTROL3_ID'], password:env['CSSTROL3_PW']]
  }
  Map getEditorUser() {
    [username:env['CSSTROL4_ID'], password:env['CSSTROL4_PW']]
  }
  Map getAdminUser() {
    [username:env['CSSTROL5_ID'], password:env['CSSTROL5_PW']]
  }
}
