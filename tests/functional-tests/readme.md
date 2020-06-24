# Functional Tests

## Description

This is the functional automated test framework that runs our E2E tests.
The framework is based on [Geb](https://gebish.org/) and [Spock](http://spockframework.org/) and it suited to support BDD.

## Usage (Local)

1. Start the application under test
2. Make sure you have Java installed (Min. Version 1.8)
3. Make sure you have Gradle 4.2.1 installed: `choco install gradle --version=4.2.1` (Windows only - other options see: [Install Gradle](https://gradle.org/install/) )
4. Copy the `env.local file` to `.env` and fill in the details required. (Updating the version numbers of the components is not recommended without guidance as complex interdependencies can cause issues.)

The following commands will launch the tests with the **local browsers**:

    gradle chromeTest
    gradle firefoxTest

Local browser testing is suggested when developing tests or for developers to run a quick smoke test on their workstation.

**[BrowserStack](https://www.browserstack.com/):**

    gradle remoteEdgeTest
    gradle remoteFirefoxTest
    gradle remoteChromeTest

Additional BrowserStack browsers are supported with additional configuration, this includes mobile platforms.

BrowserStack testing is suggested for all cross browser testing needs and running tests as part of the build pipeline.

**Headless** (for incorporation in your CI):

    gradle chromeHeadlessTest (recommended)
    gradle firefoxHeadlessTest (will require additional set up)

Headless testing is suggested for CI testing where there is a need to run the browser sessions on the CI server.    

**Run All Tests on All Browsers (local, headless and remote)**
    
    gradle Test

Before deploying new test code, it is suggested to run your new tests on all platforms before submitting the PR.    

## Test result reports

After the tests have been run (example: chromeTest), you can find the test reports here:

- build\reports\spock\index.html _Showing the BDD results per User Story (Business focused view)_
- build\reports\tests\chromeTest\index.html _Showing the test results (more technical view)_
- build\test-results\chromeTest _Contains individual XML test result files that can be consumed by Jenkins in the pipeline to provide consolidated test result reporting._

Additionally, if you ran the tests on BrowserStack (remote...), you can obtain the test results on BrowserStack by going to your [**Automate** dashboard](https://automate.browserstack.com/dashboard/v2). These results allow you to review the test run by the captured video.

## Key Locations

**Tests:** src/test/groovy/specs
**Page Definitions:** src/test/groovy/pages

**Configuration Files:**  
* build.gradle
* gradle/versions.gradle
* src/test/groovy/resources/GebConfig.groovy