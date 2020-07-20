/*
	This is the Geb configuration file.

	See: http://www.gebish.org/manual/current/#configuration
*/

import org.openqa.selenium.Dimension
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import org.openqa.selenium.PageLoadStrategy
import com.aoe.gebspockreports.GebReportingListener
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver
import listeners.SessionIdHolder
import com.browserstack.local.Local

// Allows for setting you baseurl in an environment variable.
// This is particularly handy for development and the pipeline
Map env = System.getenv()
baseUrl = env['BASEURL']
if (!baseUrl) {
	baseUrl = "https://comfort-dev.pathfinder.gov.bc.ca/app/"
}
println "BaseURL: ${baseUrl}"
println "--------------------------"

String browserstackProjectName = env['PROJECT_NAME']

//can be set in CI environment scripts
USERNAME = env['BROWSERSTACK_USERNAME']
AUTOMATE_KEY = env['BROWSERSTACK_TOKEN']

if (!USERNAME || !AUTOMATE_KEY)
	throw RuntimeError('BROWSERSTACK_USERNAME and BROWSERSTACK_TOKEN are required');

// Wait Settings
waiting {
	timeout = 30
	retryInterval = 3
}
atCheckWaiting = [30, 3]

String buildId = SessionIdHolder.instance.buildId

environments {

	// See: https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver
	ChromeOptions o = new ChromeOptions()
	o.addArguments('no-sandbox')
	o.addArguments('disable-extensions')
	o.addArguments('dns-prefetch-disable')
	o.addArguments('disable-gpu')
	o.addArguments('start-maximized')
	o.addArguments('enable-automation')
	o.addArguments('disable-infobars')
	o.addArguments('disable-dev-shm-usage')
	o.addArguments('disable-browser-side-navigation')
	o.setPageLoadStrategy(PageLoadStrategy.NONE)

	chrome {
		driver = {
			driver = new ChromeDriver(o)

            return driver
			}
	}

	// See: https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver
	chromeHeadless {
		driver = {
			o.addArguments('headless')
			driver = new ChromeDriver(o)

            return driver
		}
	}

	// See: https://github.com/SeleniumHQ/selenium/wiki/FirefoxDriver
	firefox {
		driver = { new FirefoxDriver() }
	}

	firefoxHeadless {
		driver = {
			FirefoxOptions fo = new FirefoxOptions()
			fo.addArguments('-headless')
			driver = new FirefoxDriver(fo)

            return driver
		}
	}

	remoteFirefox {
		driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
			caps.setCapability("browser", "Firefox")
			caps.setCapability("browser_version", "77.0")
			caps.setCapability("os", "Windows")
			caps.setCapability("os_version", "10")
			caps.setCapability("resolution", "1920x1200")
			caps.setCapability("name", "Automated Test")
			caps.setCapability("project", "${browserstackProjectName}")
			caps.setCapability("build", "${buildId}:Firefox")

			String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

			driver = new RemoteWebDriver(new URL(URL), caps)

			return driver
		}
	}

	remoteEdge {
		driver = {
			DesiredCapabilities caps = new DesiredCapabilities();
			caps.setCapability("browser", "Edge")
			caps.setCapability("os", "Windows")
			caps.setCapability("os_version", "10")
			caps.setCapability("resolution", "1920x1200")
			caps.setCapability("name", "Automated Test")
			caps.setCapability("project", "${browserstackProjectName}")
			caps.setCapability("build", "${buildId}:Edge")

			String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

			driver = new RemoteWebDriver(new URL(URL), caps)

			return driver
		}
	}

	remoteChrome {
		driver = {
			DesiredCapabilities caps = new DesiredCapabilities();
			caps.setCapability("browser", "Chrome")
			caps.setCapability("os", "Windows")
			caps.setCapability("os_version", "10")
			caps.setCapability("resolution", "1920x1200")
			caps.setCapability("name", "Automated Test")
			caps.setCapability("project", "${browserstackProjectName}")
			caps.setCapability("build", "${buildId}:Chrome")
			caps.setCapability("browserstack.local", "false");

			String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

			driver = new RemoteWebDriver(new URL(URL), caps)

			return driver
		}
	}
	remoteSafari {
		driver = {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("os", "OS X");
      caps.setCapability("os_version", "Catalina");
      caps.setCapability("browser", "Safari");
      caps.setCapability("browser_version", "13.1");
      caps.setCapability("resolution", "1920x1080");
			caps.setCapability("name", "Automated Test")
			caps.setCapability("project", "${browserstackProjectName}")
			caps.setCapability("build", "${buildId}:Safari")
			caps.setCapability("browserstack.local", "false");
      caps.setCapability("browserstack.networkLogs", "true");
      caps.setCapability("browserstack.timezone", "America/Vancouver");
      caps.setCapability("browserstack.safari.enablePopups", "true");
      caps.setCapability("browserstack.safari.allowAllCookies", "true");

			String URL = "https://" + USERNAME + ":" + AUTOMATE_KEY + "@hub-cloud.browserstack.com/wd/hub"

			driver = new RemoteWebDriver(new URL(URL), caps)

			return driver
		}
	}
}

// To run the tests with all browsers just run “./gradlew test”
baseNavigatorWaiting = true

// autoClearCookies = false
// autoClearWebStorage = false
//cacheDriver = false

cacheDriverPerThread = false
quitCachedDriverOnShutdown = true

reportOnTestFailureOnly = false
reportingListener = new GebReportingListener()
reportsDir = 'build/reports/spock'
