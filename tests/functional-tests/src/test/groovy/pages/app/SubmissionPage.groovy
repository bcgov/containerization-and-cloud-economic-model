package pages

class SubmissionPage extends BaseAppPage {

    static at = { title == 'Industrial Camps Submission' && headerTitle }
    //static url = 'minesoperatorscreening/admin/submission/'

    static content = {
        headerTitle(wait: true) { $("h1", "data-test": "btn-header-title", text: "Industrial Camps Submission") }
    }

}
