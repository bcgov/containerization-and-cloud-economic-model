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

class MenuPage extends BaseAppPage {

    static at = { title == 'Common Forms Toolkit' }
    static url = 'home'

    static content = {
        headerTitle(wait: true) { $("h1",text: "COVID-19 Operator Screening Forms") }
        toolbarLogout(wait: true) { $("button", "data-test": "btn-base-auth-logout") }
        agricultureScreening { $("h2", text: "Agriculture and Seafood Operator Screening") }
        minesScreening { $("h2", txt: "Mines Operator Screening") }
        forestryScreening { $("h2", txt: "Forestry Sector Operator Screening") }
    }

}
