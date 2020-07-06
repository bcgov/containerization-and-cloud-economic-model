package modules

import geb.Module
import geb.navigator.Navigator

/**
 * Contains objects and methods for interacting with the global header bar.
 */
class HeaderModule extends Module {
  static content = {
    bcLogo { $('div.v-image__image.v-image__image--contain') }
    headerTitle { $('h1', "data-test":"btn-header-title") }

    // non-responsive login button
    loginButton { $('#keycloak-auth-login-button') }

    headerNavigationBar { $('header #navContainer .navbar-nav') }
  }

  /**
   * Clicks a header menu anchor tag based on its text.
   * @param headerText the text of the header link to be clicked. (required)
   */
  void clickMenuItem(String headerText) {
    waitFor {
      getHeaderSelector(headerText).click()
    }
  }

  /**
   * Returns the selector for a header menu anchor tag based on its text.
   * @param headerText the text of the header link to be clicked. (required)
   */
  Navigator getHeaderSelector(String headerText) {
    headerNavigationBar.$('a', text:"$headerText")
  }
}
