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

import specs.traits.Login
import pages.MenuPage
import pages.HomePage
import spock.lang.Issue
import spock.lang.Narrative
import spock.lang.Specification
import spock.lang.Title
import spock.lang.Stepwise

@Title('Login Access')
@Narrative("""
As a valid user
I want log in to the comfort application
""")
@Issue('')
@Stepwise
class ComfortHomeSpec extends BaseSpec implements Login {

  def "As a None user, I want to to log in into the Comfort application."() {
  when: "I login as None"
    logInAsNoneUser()
  then: 'I see the menu page'
    at MenuPage
    waitFor { toolbarLogout.click() }
    at HomePage
    clearAndResetBrowser()
  }
  def "As a Viewer user, I want to to log in into the Comfort application."() {
  when: "I login as Viewer"
    logInAsViewerUser()
  then: 'I see the menu page'
    at MenuPage
    waitFor { toolbarLogout.click() }
    at HomePage
    clearAndResetBrowser()
  }
  def "As a Reviewer user, I want to to log in into the Comfort application."() {
    when: "I login as Reviewer"
      logInAsReviewerUser()
    then: 'I see the menu page'
      at MenuPage
      waitFor { toolbarLogout.click() }
      at HomePage
      clearAndResetBrowser()
  }
  def "As a Editor user, I want to to log in into the Comfort application."() {
    when: "I login as Editor"
      logInAsEditorUser()
    then: 'I see the menu page'
      at MenuPage
      waitFor { toolbarLogout.click() }
      at HomePage
      clearAndResetBrowser()
  }
  def "As a Admin user, I want to to log in into the Comfort application."() {
    when: "I login as Admin"
      logInAsAdminUser()
    then: 'I see the menu page'
      at MenuPage
      waitFor { toolbarLogout.click() }
      at HomePage
      clearAndResetBrowser()
  }
}
