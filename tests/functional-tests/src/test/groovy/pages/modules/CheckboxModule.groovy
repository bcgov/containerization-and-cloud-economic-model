package modules

import geb.Module

class CheckboxModule extends Module {
    def check() {
        this.value(true)
    }

    def uncheck() {
        this.value(false)
    }

    def isUnchecked() {
        this.value() == false
    }

    def isChecked() {
        !isUnchecked()
    }
}
