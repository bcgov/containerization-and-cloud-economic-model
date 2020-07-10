package specs.traits

import pages.HomePage
import pages.LoginPage

/**
 * Methods to manage logging in.
 */
trait Login implements Users {

  /**
   * Log a user in.
   *
   * @param a Map containing username and password keys. eg: [username:'someUsername', password:'somePassword']
   */
  void login(Map user) {
    to HomePage
    at HomePage
    assert toolbarTitle

    toolbar_loginButton()

    at LoginPage

    waitFor { usernameField.value(user.username) }
    waitFor { passwordField.value(user.password) }

    waitFor { logInButton.click() }
  }

  void logInAsAdminUser() {
    login(getAdminUser())
  }

  void logInAsViewerUser() {
    login(getViewerUser())
  }

  void logInAsReviewerUser() {
    login(getReviewerUser())
  }

  void logInAsEditorUser() {
    login(getEditorUser())
  }

  void logInAsNoneUser() {
    login(getNoneUser())
  }

}
