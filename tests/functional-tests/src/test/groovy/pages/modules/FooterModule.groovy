package modules

import geb.Module

/**
 * Contains objects and methods for interacting with the global footer bar.
 */
class FooterModule extends Module {
  static content = {
    footerBar { $('footer') }
  }

  /**
   * Clicks a footer menu anchor tag based on its text.
   * @param footerText the text of the footer link to be clicked. (required)
   */
  void clickMenuItem(String footerText) {
    waitFor {
      footerBar.$('a', text:"$footerText").click()
    }
  }
}
