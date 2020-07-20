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

#!/usr/bin/env groovy
podTemplate(label: 'bddstack', name: 'bddstack', serviceAccount: 'jenkins', cloud: 'openshift', containers: [
  containerTemplate(
    name: 'jnlp',
    image: 'docker-registry.default.svc:5000/vmvfjv-tools/bddstack',
    resourceRequestCpu: '500m',
    resourceLimitCpu: '1000m',
    resourceRequestMemory: '1Gi',
    resourceLimitMemory: '4Gi',
    workingDir: '/home/jenkins',
    command: '',
    args: '${computer.jnlpmac} ${computer.name}',
    envVars: [
        secretEnvVar(key: 'BROWSERSTACK_USERNAME', secretName: 'csst-browserstack-signin-secret', secretKey: 'BROWSERSTACK_USERNAME'),
        secretEnvVar(key: 'BROWSERSTACK_TOKEN', secretName: 'csst-browserstack-signin-secret', secretKey: 'BROWSERSTACK_TOKEN'),
        secretEnvVar(key: 'CSSTROL1_ID', secretName: 'csst-test-idir-1-secret', secretKey: 'username'),
        secretEnvVar(key: 'CSSTROL1_PW', secretName: 'csst-test-idir-1-secret', secretKey: 'password'),
        secretEnvVar(key: 'CSSTROL2_ID', secretName: 'csst-test-idir-2-secret', secretKey: 'username'),
        secretEnvVar(key: 'CSSTROL2_PW', secretName: 'csst-test-idir-2-secret', secretKey: 'password'),
        secretEnvVar(key: 'CSSTROL3_ID', secretName: 'csst-test-idir-3-secret', secretKey: 'username'),
        secretEnvVar(key: 'CSSTROL3_PW', secretName: 'csst-test-idir-3-secret', secretKey: 'password'),
        secretEnvVar(key: 'CSSTROL4_ID', secretName: 'csst-test-idir-4-secret', secretKey: 'username'),
        secretEnvVar(key: 'CSSTROL4_PW', secretName: 'csst-test-idir-4-secret', secretKey: 'password'),
        secretEnvVar(key: 'CSSTROL5_ID', secretName: 'csst-test-idir-5-secret', secretKey: 'username'),
        secretEnvVar(key: 'CSSTROL5_PW', secretName: 'csst-test-idir-5-secret', secretKey: 'password')
       ]
  )
])
{
    stage('Automated E2E Functional Test') {
        node('bddstack') {
            //the checkout is mandatory, otherwise functional test would fail
            echo "checking out source"
            echo "Build: ${BUILD_ID}"
            checkout scm
            dir('tests/functional-tests') {
                try {
                        sh '/opt/gradle/gradle-4.2.1/bin/gradle remoteChromeTest'
                } finally {
                        archiveArtifacts allowEmptyArchive: true, artifacts: 'build/reports/geb/**/*'
                        junit 'build/test-results/**/*.xml'
                        publishHTML (target: [
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: false,
                                    keepAll: true,
                                    reportDir: 'build/reports/spock',
                                    reportFiles: 'index.html',
                                    reportName: "Test: BDD Spock Report"
                                ])
                        publishHTML (target: [
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: false,
                                    keepAll: true,
                                    reportDir: 'build/reports/tests/remoteChromeTest',
                                    reportFiles: 'index.html',
                                    reportName: "Test: Full Test Report"
                                ])
                }
            }
        }
    }
}
