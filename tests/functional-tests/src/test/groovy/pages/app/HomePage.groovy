package pages

class HomePage extends BaseAppPage {

    static at = { title == 'Common Forms Toolkit' }
    static url = 'home'

    static content = {
        toolbarTitle(wait: true) { $("h1", "data-test":"btn-header-title",text: contains('Common Forms Toolkit')) }
        toolbar_Login { $("button",0) }
        screen_Login { $("button",1) } // only there pre-login
        agriView { $('button',1) }
        agriAdmin { $('button',2) }
        forestryView { $('button',3) }
        forestryAdmin { $('button',4) }
        minesView { $('button',5) }
        minesAdmin { $('button',6) }

    }

    void toolbar_loginButton() {
        toolbar_Login.click()
    }

    void screen_loginButton() {
        screen_Login.click()
    }
}
