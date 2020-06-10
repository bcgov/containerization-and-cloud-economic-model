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

