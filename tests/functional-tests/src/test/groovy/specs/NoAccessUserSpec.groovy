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

package specs

import specs.traits.LoginAdmin
import pages.LoginAdminPage
import pages.AdminHomePage
import geb.module.FormElement

import spock.lang.*
//import org.openqa.selenium.Cookie

@Title("No admin Access")
@Narrative("""
As an unauthorized user
I want use the comfort admin application
So that I can manage the submissions
""")
@Issue("")
@Stepwise
class NoAccessUserSpec extends BaseSpec implements LoginAdmin {

  def "As a No Access user, I want to to log in into the Comfort admin application."() {
    when: "I go to the admin page"
      to LoginAdminPage
    then: "I login as None"
      logInAsNoneUser()
    then: 'I see the menu page, with "You have not been granted access to this feature yet."'
      at AdminHomePage
      assert header_One.text() == "Thank you for logging in."
      assert header_Two.text() == "You have not been granted access to this feature yet."
  }
  def "As a No Access user, I want request access to the admin function"() {
    when: "I am at the admin page"
      to LoginAdminPage
      at AdminHomePage
    then: "I click on 'Request Access' "
      requestAccess.click()
      waitFor { popUp }
    when: "I click OK"
      okButton.click()
    then: "I am back at the starting page"
      at AdminHomePage
      assert requestAccess.module(FormElement).disabled
      clearAndResetBrowser()
  }
}
