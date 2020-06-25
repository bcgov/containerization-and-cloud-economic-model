---
title: Common Forms Toolkit Developer Guide
description: General developer instructions for getting COMFORT started from scratch
---

The Common Forms Toolkit is a full-stack application for creating and managing multi-tenanted forms. The goal of this application is to provide a streamlined and pragmatic approach for creating and managing multiple forms, each with its own rich set of functionality and authorization structure.

## Getting Started

This section is meant to help new developers who have just cloned this repository to get started on running the application.

### Prerequisites

Before running this application, you will need to have the following installed on your machine:

* Node.js 12.x or higher

Once you have those prerequisites, refer to the appropriate sections below on getting your environment set up depending on how you are planning on locally running your application.

#### Docker Setup

If you want to run the application prerequisites through Docker, you will need the following:

* Docker Desktop Community Edition 2.3.x.x or higher

Refer to the [Local Infrastructure](../local-infrastructure/README.md) guide on how to setup and run the application.

#### Bare Metal Setup

If you want to run this application on "bare-metal", you will also need the following:

* PostgreSQL 10.7 or higher
* Keycloak 10 or higher
  * This can either be a hosted instance, or a locally run version

If you are going the bare-metal route, you will need to ensure that both the database and Keycloak setup are managed before attempting to start the application.

##### Postgres

For the Postgres database, ensure you have created a database named `comfort` and have at least one Postgres account set up to have read and write access to the `comfort` database. Note these credentials down as you will need them for [Environment Setup](#environment-setup) later.

##### Keycloak

The Keycloak instance on the [Docker Setup](#docker-setup) path has been pre-configured to work with the application out of the box. However, setting up the roles, groups, and management manually is an involved process. For step by step details on this, check the [Team Management/Keycloak Setup](team-management.md) documentation.

### Environment Setup

Once you have your database and Keycloak instances set up, you will need to configure and save a `local.json` file under the `/app/config` directory in order to let the application know how to reach the database and authentication systems.

Below is a minimally viable `local.json` configuration file (with non-functional sample values included). Replace all of these placeholder values with their correct values as needed.

```json
{
  "db": {
    "username": "username",
    "password": "password"
  },
  "frontend": {
    "keycloak": {
      "clientId": "clientId"
    }
  },
  "server": {
    "keycloak": {
      "adminClientSecret": "00000000-0000-0000-0000-000000000000",
      "clientSecret": "00000000-0000-0000-0000-000000000000"
    },
    "logLevel": "debug",
    "morganFormat": "dev"
  },
  "serviceClient": {
    "commonServices": {
      "password": "00000000-0000-0000-0000-000000000000"
    }
  }
}
```

For full details on all potential configuration values, refer to both the [custom-environment-variables.json](../app/config/custom-environment-variables.json) and [default.json](../app/config/default.json) files found under `/app/config`.

### Application Quick Start

Once you have your prerequisites and environment set up, you can proceed with running COMFORT. You can quickly run this application in `production` mode with the following commands.

```sh
cd app
npm run all:install
npm run all:build
npm run serve
```

Refer to the [Application Readme](../app/README.md) and [Frontend Readme](../app/frontend/README.md) for more specific details on running the code.

## API Endpoints

COMFORT has a generalized API design which is documented in multiple formats.

* [OpenAPI 3.0](../app/src/docs/v1.api-spec.yaml) YAML specification
  * If COMFORT is running, you can view the OpenAPI spec through ReDocs at the `/app/api/v1/docs` path.
* Postman Collections - can be found at [/app/tests/postman](../app/tests/postman)
