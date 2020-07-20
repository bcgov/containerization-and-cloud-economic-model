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

package listeners

/*
 * A singleton to hold the current browserstack session ID
 */
@Singleton
class SessionIdHolder {

  public static final ThreadLocal<String> sessionId = new ThreadLocal<String>()

  public static final String buildId

  static {
    def env = System.getenv()
    if (env['BUILD_NUMBER']) {
      buildId = "CI build " + env['BUILD_NUMBER']
    } else {
      buildId = "Manual build " + UUID.randomUUID().toString()
    }
  }
}
