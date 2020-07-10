package pages

class MinesAdminPage extends BaseAppPage {

    static at = { title == 'Industrial Camps Admin' && headerTitle }
    static url = 'minesoperatorscreening/admin'

    static content = {
        headerTitle(wait: true) { $("h1", "data-test": "btn-header-title", text: "Industrial Camps Admin") }
        pageTitle(wait: true) { $("h1",1) }
    }

}
