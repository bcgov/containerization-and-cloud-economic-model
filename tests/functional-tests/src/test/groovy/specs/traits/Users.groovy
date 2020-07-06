package specs.traits

/**
 * Methods to manage user credentials.
 */
trait Users {
  Map env = System.getenv()
  Map getNoneUser() {
    [username:env['CSSTROL1_ID'], password:env['CSSTROL1_PW']]
  }
  Map getViewerUser() {
    [username:env['CSSTROL2_ID'], password:env['CSSTROL2_PW']]
  }
  Map getReviewerUser() {
    [username:env['CSSTROL3_ID'], password:env['CSSTROL3_PW']]
  }
  Map getEditorUser() {
    [username:env['CSSTROL4_ID'], password:env['CSSTROL4_PW']]
  }
  Map getAdminUser() {
    [username:env['CSSTROL5_ID'], password:env['CSSTROL5_PW']]
  }
}
