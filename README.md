<!-- PROJECT SHIELDS -->
<!--
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]](/../../graphs/contributors)
[![Forks][forks-shield]](/../../network/members)
[![Stargazers][stars-shield]](/../../stargazers)
[![Issues][issues-shield]](/../../issues)
[![MIT License][license-shield]](/LICENSE.txt)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://gov.bc.ca">
    <img src="frontend/src/assets/images/bc_logo.svg" alt="Logo">
  </a>

  <h3 align="center">Cloud Economic Model</h3>

  <p align="center">
    The Cloud Economic Model makes financial sense of adopting cloud-based infrastructure.
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#code-of-conduct">Code of Conduct</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

A Vue Frontend (single page application) asks questions which are used to complete an Excel spreadsheet template. Results are provided by email. Common Services APIs are used for GETOK (internal authentication), CDOGS (document generation) and CHES (email).

This project started as a fork of the Common Services Team's [Common Forms Toolkit](https://github.com/bcgov/common-forms-toolkit).

### Sample: DEV Mode Sensitivity Analysis Options

![Questions](.images/questions.png)

### Architecture

![CEM Architecture](.images/overview.png)

### Built With

Technologies:

- [Node.js](https://nodejs.org/)
- [Vue.js](https://vuejs.org/)
- [Express.js](https://expressjs.com/)

Services:

- [Common Services GETOK](https://getok.nrs.gov.bc.ca)
- [Common Document Generation Service (CDOGS)](https://bcgov.github.io/common-document-generation-service)
- [Common Hosted Email Service (CHES)](https://bcgov.github.io/common-hosted-email-service)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Common Services Access Token (GETOK)

A Common Services GETOK is available for internal use by the Government of British Columbia. Please see their project documentation to receive a client ID and secret.

- [Onboarding/About](https://getok.nrs.gov.bc.ca/app/about)
- [Request Account](https://getok.nrs.gov.bc.ca/app/requestAccount)
- [My Applications](https://getok.nrs.gov.bc.ca/app/myApps)

### Development Platform

Linux and OS X's bash terminals may be used as-is.

Windows Substem for Linux v2 is **strongly recommended** for Windows development.

- [Windows Subsystem for Linux Installation (Windows Only)](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

### Installation - Docker Compose

0. Install [Docker](https://docs.docker.com/get-docker) and [Docker Compose](https://docs.docker.com/compose/install)

1. Clone, open and view the repo's contents, including hidden files

   ```sh
   git clone https://github.com/<ORGANIZATION>/<REPOSITORY>.git
   cd <REPOSITORY>
   ls -la
   ```

2. Start the Backend API in development mode

   ```sh
   cd backend
   export CMNSRV_CLIENTID="<REDACTED>"
   export CMNSRV_CLIENTSECRET="<REDACTED>"
   npm install
   npm run dev
   ```

3. Start the Frontend Vue App (requires a new terminal session)

   ```sh
   cd frontend
   npm install
   npm run serve
   ```

4. Open the application. Frontend is the intended entry point.

- [Frontend (localhost:8080)](http://localhost:8080)
- [Backend (localhost:3000)](http://localhost:3000)

### Installation - Local

0. Install [Node.js 10+](https://nodejs.org/en/download/)

1. Export client ID and secret for consumption by the backend

   ```sh
   export CMNSRV_CLIENTID="<REDACTED>"
   export CMNSRV_CLIENTSECRET="<REDACTED>"
   ```

2. Clone, open and view the repo's contents, including hidden files

   ```sh
   git clone https://github.com/<ORGANIZATION>/<REPOSITORY>.git
   cd <REPOSITORY>
   ls -la
   ```

3. Start the Backend API in development mode

   ```sh
   cd backend
   npm install
   npm run dev
   ```

4. Start the Frontend Vue App (requires a new terminal session)

   ```sh
   cd frontend
   npm install
   npm run serve
   ```

5. Open the application. Frontend is the intended entry point.

- [Frontend (localhost:8080)](http://localhost:8080)
- [Backend (localhost:3000)](http://localhost:3000)

<!-- USAGE EXAMPLES -->

## Roadmap

See the [open issues](/../../issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire and create. Any contributions you make are **greatly appreciated**. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

1. Fork the Project. Do this online using a [GitHub account](https://github.com/join)
2. Create and Push your Feature Branch

   ```
   git checkout -b feature/featureTitle
   git push -u origin feature/featureTitle
   ```

3. Add and Commit your Changes

   ```
   git add file_or_path
   git commit -m "Description of feature or change"
   ```

4. Push to the Branch Regularly

   ```
   git push
   ```

5. Open a Pull Request online

<!-- CONDUCT -->

## Code of Conduct

Be inclusive and respectful. More information is available in [CONDUCT.md](CONDUCT.md).

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE.txt](LICENSE.txt) for more information.

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Common Services Wiki](https://github.com/bcgov/nr-get-token/wiki)
- [Common Forms Toolkit (ComForT)](https://github.com/bcgov/common-forms-toolkit)
- [othneildrew's Best README Template](https://github.com/othneildrew/Best-README-Template)
- [shields.io](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/DerekRoberts/cem.svg?style=for-the-badge
[forks-shield]: https://img.shields.io/github/forks/DerekRoberts/cem.svg?style=for-the-badge
[stars-shield]: https://img.shields.io/github/stars/DerekRoberts/cem.svg?style=for-the-badge
[issues-shield]: https://img.shields.io/github/issues/DerekRoberts/cem.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/DerekRoberts/cem.svg?style=for-the-badge
