package specs

import listeners.BrowserStackReportingSpec
import pages.ComfortHomePage
import pages.LoginPage

class ComfortHomeSpec extends BrowserStackReportingSpec {

    def "As a user, I wanto to log in into the Comfort application."() {
        when: 'I enter the url for the Homepage'
            to ComfortHomePage
        then: 'I arrive at the correct homepage'
            at ComfortHomePage
            assert toolbar_Title
            assert toolbar_Login
            assert screen_Login
        when: 'I click Login'
            toolbar_loginButton()
        then: 'I am shown the Government login'
            at LoginPage
            assert pageTitle
            assert usernameField
            assert passwordField
            assert logInButton
    }
}
