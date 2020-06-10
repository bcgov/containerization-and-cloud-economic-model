package pages

import geb.Page

class LoginPage extends Page {
  static at = { title == 'Government of British Columbia' }

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
