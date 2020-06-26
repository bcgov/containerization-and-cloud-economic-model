
# Common Forms Toolkit  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Quality Gate](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/gate?key=common-forms-toolkit-master)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)

[![Bugs](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=bugs)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Vulnerabilities](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=vulnerabilities)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Code Smells](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=code_smells)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Coverage](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=coverage)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Lines](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=lines)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)
[![Duplication](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/api/badges/measure?key=common-forms-toolkit-master&metric=duplicated_lines_density)](https://sonarqube-vmvfjv-tools.pathfinder.gov.bc.ca/dashboard?id=common-forms-toolkit-master)

COMFORT is an opinionated toolkit approach to designing and managing multi-tenanted forms.

## Directory Structure

    .github/                   - PR and Issue templates
    app/                       - Application Root
    ├── frontend/              - Frontend Root
    │   ├── src/               - Vue.js frontend web application
    │   └── tests/             - Vue.js frontend web application tests
    ├── src/                   - Node.js backend web application
    │   ├── db/migrations      - data migration scripts
    │   └── forms/             - Models, Controllers, Routes for the forms
    │       └── teammanagement - Common team mangement code
    └── tests/                 - Node.js backend web application tests
    docs/                      - Documentation
    openshift/                 - OpenShift-deployment and shared pipeline files
    CODE-OF-CONDUCT.md         - Code of Conduct
    COMPLIANCE.yaml            - BCGov PIA/STRA compliance status
    CONTRIBUTING.md            - Contributing Guidelines
    Jenkinsfile                - Top-level Pipeline
    Jenkinsfile.cicd           - Pull-Request Pipeline
    LICENSE                    - License
    sonar-project.properties   - SonarQube configuration

## Documentation

* [Overview](docs/overview.md)
* [Developer Guide](docs/developer-guide.md)
* [Team Management/Keycloak Setup](docs/team-management.md)
* [Application Readme](app/README.md)
* [Frontend Readme](app/frontend/README.md)
* [Openshift Readme](openshift/README.md)
* [Functional Tests Readme](tests/functional-tests/README.md)
* [COMFORT Wiki](https://github.com/bcgov/common-forms-toolkit/wiki)
* [Devops Tools Setup](https://github.com/bcgov/nr-showcase-devops-tools)
* [Showcase Team Roadmap](https://github.com/bcgov/nr-get-token/wiki/Product-Roadmap)

## Developer Quick Start

Check the [Developer Guide](docs/developer-guide.md) for instructions on how to quickly set up and run this application.

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
