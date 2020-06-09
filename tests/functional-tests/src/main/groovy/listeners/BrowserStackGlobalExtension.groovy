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
