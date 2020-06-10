# BDDStack - Browserstack Support Version

## Description

This is an example of using Browserstack in conjunction with Geb/Spock tests as part of a gradle build.

It works out of the box with Chrome, Edge, and Firefox on Windows 10, and can be readily configured to support many more
 browsers (even mobile devices) by adjusting the configuration in `src/test/resources/GebConfig.groovy`.
 
 It works equally well on Windows, Mac, and Linux hosts since tests run remotely, and it works well within an Openshift
  or Jenkins pipeline.
 
## Usage

The following commands will launch the example tests with the individual browsers:

    ./gradlew remoteFirefoxTest
    ./gradlew remoteChromeTest
    ./gradlew remoteEdgeTest

Test results will be available in your Browserstack Automate console and will include videos and detailed logs. JUnit test results are also generated for consumption by your test reporter of choice.

Replace `./gradlew` with `gradlew.bat` in the above examples if you're on Windows.

## Adapting Tests

Your Geb specs must extend from the special base class in `listeners.BrowserStackReportingSpec`, a subclass of `GebSpec` that provides support for reporting status information via the Browserstack API.

## Configuration

Two environment variables ___MUST___ be supplied for the tests to execute. They can be supplied via the `.env` file also.

`BROWSERSTACK_USERNAME` and `BROWSERSTACK_TOKEN`.

Optional configuration parameters are identified in `build.gradle` and `GebConfig.groovy` with the annotation `//@changeme`.

## Getting Help

Contact me on BCGov RocketChat @robert.johnstone
