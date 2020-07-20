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

import org.spockframework.runtime.AbstractRunListener
import org.spockframework.runtime.model.SpecInfo
import org.spockframework.runtime.model.FeatureInfo
import org.spockframework.runtime.model.ErrorInfo

/*
 * Watches test execution status and will update Browserstack with status information
 */
class BrowserStackUpdateListener extends AbstractRunListener {


  boolean failed = false
  String reason = null

  @Override
  public void beforeSpec(SpecInfo spec) {
  }

  @Override
  public void beforeFeature(FeatureInfo feature) {
  }

  @Override
  public void afterFeature(FeatureInfo feature) {
    String id = SessionIdHolder.instance.sessionId.get()
    if (id != null) {
      BrowserStackAPI.updateSessionName(id, feature.featureMethod.name)
      if (this.failed) {
        BrowserStackAPI.markSessionFailed(id, reason)
      }
    }
  }

  @Override
  public void afterSpec(SpecInfo spec) {
  }

  @Override
  public void error(ErrorInfo error) {
    this.failed = true
    this.reason = error.exception.message
  }

}
