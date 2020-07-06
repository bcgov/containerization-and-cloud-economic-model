package specs

import geb.spock.GebReportingSpec
import listeners.BrowserStackReportingSpec
import org.openqa.selenium.Keys

import specs.traits.Utils

/**
 * Base spec.
 *
 * All specs should extend this class.
 */
abstract class BaseSpec extends BrowserStackReportingSpec implements Utils {

}
