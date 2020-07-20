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

class HomePage extends BaseAppPage {

    static at = { title == 'Common Forms Toolkit' }
    static url = 'home'

    static content = {
        toolbarTitle(wait: true) { $("h1", "data-test":"btn-header-title",text: contains('Common Forms Toolkit')) }
        toolbar_Login { $("button",0) }
        screen_Login { $("button",1) } // only there pre-login
        agriView { $('button',1) }
        agriAdmin { $('button',2) }
        forestryView { $('button',3) }
        forestryAdmin { $('button',4) }
        minesView { $('button',5) }
        minesAdmin { $('button',6) }

    }

    void toolbar_loginButton() {
        toolbar_Login.click()
    }

    void screen_loginButton() {
        screen_Login.click()
    }
}
