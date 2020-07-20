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

import org.spockframework.runtime.extension.IGlobalExtension
import org.spockframework.runtime.model.SpecInfo

/*
 * Registers the Browserstack update listener (this class must be configured by placing a text file
 * in src/test/resources/META-INF/services/org.spockframework/runtime.extensions.IGlobalExtension
 * containing the fully-qualified name of this class
 */
class BrowserStackGlobalExtension implements IGlobalExtension {

  @Override
  void start() {}

  @Override
  void stop() {}

  @Override
  void visitSpec(SpecInfo spec) {
    if (BrowserStackReportingSpec.isAssignableFrom(spec.reflection)) {
      spec.addListener(new BrowserStackUpdateListener())
    }
  }
}
