
# Common Forms Toolkit  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Quality Gate](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/gate?key=common-forms-toolkit-master)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)

[![Bugs](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=bugs)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Vulnerabilities](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=vulnerabilities)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Code Smells](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=code_smells)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Coverage](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=coverage)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Lines](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=lines)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Duplication](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=duplicated_lines_density)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)

Common Forms Toolkit

## Directory Structure

    .github/                   - PR and Issue templates
    app/                       - Application Root
    ├── frontend/              - Frontend Root
    │   ├── src/               - Vue.js frontend web application
    │   └── tests/             - Vue.js frontend web application tests
    ├── src/                   - Node.js backend web application
    └── tests/                 - Node.js backend web application tests
    openshift/                 - OpenShift-deployment and shared pipeline files
    Jenkinsfile                - Top-level Pipeline
    Jenkinsfile.cicd           - Pull-Request Pipeline
    LICENSE                    - License
    sonar-project.properties   - SonarQube configuration

## Documentation

* [Application Readme](app/README.md)
* [Frontend Readme](app/frontend/README.md)
* [Openshift Readme](openshift/README.md)
* [Devops Tools Setup](https://github.com/bcgov/nr-showcase-devops-tools)

## Quick Start Dev Guide

You can quickly run this application in production mode after cloning with the following commands (assuming you have already set up local configuration as well). Refer to the [Application Readme](app/README.md) and [Frontend Readme](app/frontend/README.md) for more details.

    cd app
    npm run all:install
    npm run all:build
    npm run serve

## Getting Help or Reporting an Issue

To report bugs/issues/features requests, please file an [issue](https://github.com/bcgov/common-forms-toolkit/issues).

## How to Contribute

If you would like to contribute, please see our [contributing](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE-OF-CONDUCT.md). By participating in this project you agree to abide by its terms.

## Testing Thanks

Thanks to BrowserStack for Testing Tool support via OpenSource Licensing

[![BrowserStack](browserstack-logo-white-small.png)](http://browserstack.com/)

## License

    Copyright 2020 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
