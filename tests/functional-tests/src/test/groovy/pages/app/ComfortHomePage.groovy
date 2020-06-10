package pages

class ComfortHomePage extends BaseAppPage {

    static at = { title == 'Common Forms Toolkit' }
    static url = 'home'

    static content = {
        toolbar_Title { $(".v-toolbar__title.title", text: contains('Common Forms Toolkit')) }
        toolbar_Login { $("button",0) }
        screen_Login { $("button",1) }
    }

    void toolbar_loginButton() {
        toolbar_Login.click()
    }

    void screen_loginButton() {
        screen_Login.click()
    }
}
