package specs

import specs.traits.Login
import pages.LoginPage
import pages.HomePage
import pages.MinesAdminPage
import pages.SubmissionPage
import geb.module.FormElement

import spock.lang.*
//import org.openqa.selenium.Cookie

@Title("No admin Access")
@Narrative("""
As an viewer user
I want use the comfort admin application
So that I can see the submissions
""")
@Issue("")
@Stepwise
class ReviewUserSpec extends BaseSpec implements Login {

  def "As a viewer user, I want to to log in into the Comfort admin application."() {
    when: "I login as Viewer"
      logInAsViewerUser()
    then: 'I see the menu page."'
      at HomePage
  }
  def "As a viewer, I want review the submissions for Mines"() {
    when: "I am at the home page"
      to HomePage
    then: "I click on Mines Admin"
      waitFor { minesAdmin.click() }
      at MinesAdminPage
      sleep(3000) // Have to slightly delay the script as it otherwise will not pick up the pageTitle
      assert pageTitle.text() == "Submissions"
  }
    def "As a viewer, I to open a submission"() {
    when: "I am at the admin page"
      to MinesAdminPage
    then: "I click on the first submmision"
      waitFor { $("button",2).click() }
      at SubmissionPage
      sleep(3000) // Have to slightly delay the script as it otherwise will not pick up the pageTitle

  }
}
