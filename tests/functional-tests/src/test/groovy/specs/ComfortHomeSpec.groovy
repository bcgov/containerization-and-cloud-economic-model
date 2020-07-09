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
  }
}
