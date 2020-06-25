---
title: Common Forms Toolkit Developer Guide
description: Capabilities, Getting Started, API Endpoints, Example Code
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

TBD

[Team Management/Keycloak Setup](TEAM-MANAGEMENT.md)

### Environment Setup

Once you have your database and Keycloak instances set up, you will need to configure a `local.json` file under `/app/config` in order to let the application know how to reach the database and authentication systems.

TBD

### Application Quick Start

You can quickly run this application in production mode after cloning with the following commands (assuming you have already set up local configuration as well). Refer to the [Application Readme](app/README.md) and [Frontend Readme](app/frontend/README.md) for more details.

    cd app
    npm run all:install
    npm run all:build
    npm run serve
