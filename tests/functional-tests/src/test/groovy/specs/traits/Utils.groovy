/* Copyright 2020 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

package specs.traits

import geb.navigator.Navigator
import geb.driver.CachingDriverFactory
import geb.waiting.WaitTimeoutException
import java.lang.AssertionError
import com.github.javafaker.*

/**
 * Generic re-usable utility methods.
 */
trait Utils {

  // Sets faker locale and initiates random with a new seed.
  Faker faker = new Faker(new Locale("en-CA"), new Random(Math.abs(new Random().nextInt() % 600) + 1))

  /**
   * Clears the browser and closes it.
   * The next spec to run will open a fresh browser instance.
   */
  void clearAndResetBrowser() {
    resetBrowser()
    CachingDriverFactory.clearCacheAndQuitDriver()
  }

  /**
   * Throw an AssertionError with the given message.
   *
   * @param String the exception message to throw. (optional, default: '')
   * @throws AssertionError
   */
  void fail(String message='') {
    throw new AssertionError(message)
  }

  /**
   * Appends a random 2-3 digit integer to the beginning of the provided string.
   * @param nonUniqueString a string to make unique.
   * @return the given string with random digits appended to the beginning.
   */
  String makeUnique(String nonUniqueString) {
    String random = Math.abs(new Random().nextInt() % 600) + 1
    return random + nonUniqueString
  }

  /**
   * Injects Any JS library into the page under test
   * @param library a string that hold the library url.
   */
  void injectLibrary( library ){
    js.exec("document.body.appendChild(document.createElement('script')).src='$library'")
  }

  /**
   * Injects jQuery library into the page under test
   */
  void injectjQuery(){
    injectLibrary( 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
  }

  String randomStreetName(){
    return faker.address().buildingNumber() + ' ' + faker.address().streetName()
  }

  String randomCityName(){
    return faker.address().city()
  }

  String randomPostalCode(){
    return faker.address().zipCode()
  }

  String randomProvince(){
    return faker.address().stateAbbr() //'BC'
  }

  String randomFirstName(){
    return faker.name().firstName()
  }

  String randomLastName(){
    return faker.name().lastName()
  }

  String randomPhoneNumber(){
    // The following Regex will allow for valid phonenumbers to be generated.
    return faker.regexify("[2-9][0-9]{2}-[2-9][0-9]{2}-[0-9]{4}")
  }

  String randomEmail(){
    return faker.internet().safeEmailAddress()
  }

  String randomDescription(){
    String inputString = faker.yoda().quote()
    if (inputString.length() > 255) {
      inputString = inputString.substring(0, 255);
    }
    return inputString
  }

  String randomBusinessName(){
    return (faker.company().name() + ' ' + faker.company().suffix()).toUpperCase()
  }

/*   String getStartDate(){
    date = new Date()
    formattedDate = date.format("yyyy/MM/dd")
    println "Start Date: " + formattedDate
    return formattedDate
  }

  String getEndDate(){
    def date = new Date()
    //date = date + Math.abs(new Random().nextInt() % 600) + 1
    def sdf = new SimpleDateFormat("yyyy-MM-dd")
    return sdf.format(date)
  }
 */
}

