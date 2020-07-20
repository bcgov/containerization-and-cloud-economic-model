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

package listeners

import geb.spock.GebReportingSpec
import geb.Browser

/*
 * All Specs that shouldreport to Browserstack should extend from this class
 */
class BrowserStackReportingSpec extends GebReportingSpec {

  @Override
  Browser getBrowser() {
    Browser _browser = super.getBrowser()

    if (_browser && _browser.driver) {
      SessionIdHolder.instance.sessionId.set(_browser.driver.getSessionId())
      _browser.driver.manage().window().maximize()
    }

    _browser
  }

  @Override
  void resetBrowser() {
    def driver = browser.driver
    super.resetBrowser()
    //driver.quit()
  }

}
