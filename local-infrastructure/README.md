# Local Infrastructure for COMFORT

The following will guide you through standing up a database (with current data) and a keycloak realm (with users) for local development/testing purposes.
Follow these instructions, stand up Postgres and Keycloak, then configure your application (either through environment variables or config files - see [README](../app/README.md)).

This will **NOT** stand up the email service (CHES) or the document generation service (CDOGS).

## Environment variables

We provide a default set of environment variables [.env](.env); these are used in this guide.
You can create your own .env file and pass in as the --env-file parameter, or set environment variables in your shell/terminal.

```sh
docker-compose --env-file=<your env file> <commands>
```

### Prerequisites

You have docker installed, and able to run docker-compose.

**IMPORTANT**: If you are on Windows, you _MUST_ either use CMD or Powershell to execute these commands. Mingw64 based environments will not work.

#### Build

The node_migrate service image must be built first. This will be used to seed/update the database.

```sh
docker-compose build
```

#### Stand up services

```sh
docker-compose up -d
```
Note that keycloak and postgress will run indefinitely, while node_migrate performs migrations and stops.

#### Run database migrations

Database migrations run automatically in node_migrate.  This can be repeated manually with the step below, given postgres is started and accepting connections.

```sh
docker-compose run node_migrate sh /opt/app-root/src/bin/run-migrations.sh
```

#### Add users to keycloak

You must wait for the keycloak service to be up and running.  Since keycloak service is running, we can just execute our create users script in the running container.

```sh
docker-compose exec keycloak bash /tmp/keycloak-local-user.sh
```

If you attempt to add users multiple times, expect to see error messages.  No harm will be done.

#### Using default.env

Postgres available at: postgresql://localhost:25432/comfort, connect with app/password123
Keycloak available at: <http://localhost:28080>, log in with admin/admin

Users available in all forms are:

- csst_role_1/password123 : Form Administrator
- csst_role_2/password123 : Form Editor
- csst_role_3/password123 : Form Reviewer
- csst_role_4/password123 : Form Viewer
- csst_role_5/password123 : Request Access

## Running local application

If running postgres and keycloak with the default configuration... the following will stand up the application.

_NOTE_: you may want to set the serviceClient/commonServices configuration before copying over.

```sh
cp local.json ../app/config
cd ../app
npm run all:fresh-start
```

### Stop the services

You can stop the services (and preserve their current state) with stop.  This will allow you to bring them back up with data.

```sh
docker-compose stop postgres keycloak
```

### Remove the services

Data in the services (the migration data in postgres, the user data in keycloak) is not persisted on down.  You will need to run database migrations and add users to keycloak each time you bring the services up.

```sh
docker-compose down
```
