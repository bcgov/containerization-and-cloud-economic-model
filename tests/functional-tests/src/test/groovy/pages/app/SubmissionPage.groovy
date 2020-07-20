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

class SubmissionPage extends BaseAppPage {

    static at = { title == 'Industrial Camps Submission' && headerTitle }
    //static url = 'minesoperatorscreening/admin/submission/'

    static content = {
        headerTitle(wait: true) { $("h1", "data-test": "btn-header-title", text: "Industrial Camps Submission") }
        backToSubmissions { $("a", "data-test": "btn-navbar-submissions") }
    }

}
