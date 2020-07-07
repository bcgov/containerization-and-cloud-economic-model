package specs.traits

import pages.LoginAdminPage

/**
 * Methods to manage logging in.
 */
trait LoginAdmin implements Users {

  /**
   * Log a user in.
   *
   * @param a Map containing username and password keys. eg: [username:'someUsername', password:'somePassword']
   */
  void login(Map user) {
    at LoginAdminPage

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
