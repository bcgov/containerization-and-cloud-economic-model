package pages

import geb.Page

class LoginAdminPage extends Page {
  static at = { title == 'Government of British Columbia' || title == 'Industrial Camps Admin' }
  static url = 'minesoperatorscreening/admin'

  static content = {
    pageTitle { $('#login-to').text() == 'Log in to sfs7.gov.bc.ca' }
    usernameField { $('#user') }
    passwordField { $('#password') }
    logInButton { $('input', type:'submit', name:'btnSubmit', value:'Continue') }
  }

  void logIn() {
        logInButton.click()
    }

}
