package modules

import geb.Module

/**
 * Contains objects and methods for interacting with the global footer bar.
 */
class FooterModule extends Module {
  static content = {
    footerBar { $('footer', class:"v-footer gov-footer v-sheet v-sheet--tile theme--light") }
    footerHome $("a", "data-test":"btn-footer-home", 0 )
    footerAbout $("a", "data-test":"btn-footer-about", 0 )
    footerDisclaimer $("a", "data-test":"btn-footer-disclaimer", 0 )
    footerPrivacy $("a", "data-test":"btn-footer-privacy", 0 )
    footerAccessibility $("a", "data-test":"btn-footer-accessibility", 0 )
    footerCopyright $("a", "data-test":"btn-footer-copyright", 0 )
    footerContact $("a", "data-test":"btn-footer-contact", 0 )
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
