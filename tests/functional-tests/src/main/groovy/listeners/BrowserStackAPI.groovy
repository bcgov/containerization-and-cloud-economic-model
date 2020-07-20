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

import groovyx.net.http.HTTPBuilder
import groovy.json.JsonBuilder;

import static groovyx.net.http.Method.*
import static groovyx.net.http.ContentType.*

class BrowserStackAPI {

  static void updateSessionName(String sessionId, String newName) {
    HTTPBuilder client = new HTTPBuilder("https://api.browserstack.com/automate/sessions/${sessionId}.json")
    def env = System.getenv()
    client.auth.basic env['BROWSERSTACK_USERNAME'], env['BROWSERSTACK_TOKEN']

    JsonBuilder builder = new JsonBuilder({
      name newName
    })

    client.request(PUT, JSON) { req ->
      body = builder.toString()
      response.success = { resp, reader ->
        System.out << reader
      }
      response.failure = { resp, reader ->
        System.err << reader
      }
    }
  }

  static void markSessionFailed(String sessionId, String reason) {
    HTTPBuilder client = new HTTPBuilder("https://api.browserstack.com/automate/sessions/${sessionId}.json")
    def env = System.getenv()
    client.auth.basic env['BROWSERSTACK_USERNAME'], env['BROWSERSTACK_TOKEN']

    JsonBuilder builder = new JsonBuilder({
      status 'failed'
      reason reason
    })

    client.request(PUT, JSON) { req ->
      body = builder.toString()
      response.success = { resp, reader ->
        System.out << reader
      }
      response.failure = { resp, reader ->
        System.err << reader
      }
    }
  }
}

