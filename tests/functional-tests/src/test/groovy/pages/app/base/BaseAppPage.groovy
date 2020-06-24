package pages

import geb.Page

import modules.HeaderModule
import modules.FooterModule

/**
 * Base app page where global selectors and modules used by all pages can be added.
 *
 * All pages should extend this page.
 */
class BaseAppPage extends Page {
  static content = {
    headerModule { module(HeaderModule) }
    footerModule { module(FooterModule) }
  }

// Utility Functions
  def injectLibrary( library ){
    js.exec("document.body.appendChild(document.createElement('script')).src='$library'")
  }
  void InjectjQuery(){
    injectLibrary( 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
  }
}
