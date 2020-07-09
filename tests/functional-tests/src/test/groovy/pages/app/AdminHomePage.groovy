package pages

class AdminHomePage extends BaseAppPage {

    static at = { title == "Industrial Camps Admin" }
    static url = 'minesoperatorscreening/admin'

    static content = {
        toolbarTitle { $("div", class: "v-toolbar__title title", "data-test":"btn-header-title",text: contains('Industrial Camps Admin')) }
        header_One { $("h1.my-8") }
        header_Two  { $("h3.mb-8") }
        requestAccess { $("button", "data-test": "btn-base-secure-request-access")}
        popUp { $("div.v-card").displayed }
        okButton { $("button", "data-test": "btn-base-dialog-ok")}
    }

}
