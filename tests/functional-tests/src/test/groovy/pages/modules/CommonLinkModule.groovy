package modules

import geb.Module
import geb.navigator.Navigator

/**
 * Contains objects and methods for interacting with generic page links.
 */
class CommonLinkModule extends Module {

  /**
   * Attempts to find and click a link on the page.
   *
   * @param anchorText the text of the anchor tag to be clicked. (required)
   * @param parentSelector a parent selector to narrow the search space which improves performance. (required)
   */
  void clickPageLink(String anchorText, Navigator parentSelector) {
    parentSelector.$('a', text:"$anchorText").click()
  }
}
