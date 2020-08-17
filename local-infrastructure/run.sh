#!/bin/bash
#
# Common Forms Toolkit Local Infrastructure quick run
#
# Prerequisites: Node.js 12, docker, docker compose and python
# https://bcgov.github.io/common-forms-toolkit/local-infrastructure/
# https://bcgov.github.io/common-forms-toolkit/docs/developer-guide.html
#
set -euo pipefail

# Default env file, can be overridden (VAR=something ./run.sh)
#
ENV_FILE="${ENV_FILE:-.env}"

# Pick up vars from .env, if exists
#
[ ! -f "${ENV_FILE}" ] || source ./.env
KEY_PORT=${KEYCLOAK_HOST_HTTP_PORT:-28080}

# Ensure local.json exists, else inform and exit
#
if [ ! -f "../app/config/local.json" ]; then
    echo -e "\nPlease create ./config/local.json."
    echo -e "  Minimal, redacted example: ./config/sample-local.json"
    echo -e "\nRequest a GETOK Account and password."
    echo -e "  https://getok.pathfinder.gov.bc.ca/getok/about \n"
    exit
fi

# Stop, build and bring up containers as services (daemons)
#
docker-compose stop
docker-compose build
docker-compose up -d

# Follow migrations
#
docker logs -f comfort_node_migrate

# Wait for keycloak to start and create local users
#
while (! curl -s http://localhost:${KEY_PORT}/auth/realms/cp1qly2d -o /dev/null); do
    sleep 10
done
docker exec -ti comfort_keycloak bash /tmp/keycloak-local-user.sh

# Show status of containers
#
docker ps

# Build and serve in development mode
#
pushd ../app/
npm run all:install
npm run all:build
npm run serve

# Open app
#
(! which python) || python -m webbrowser http://localhost:8080/
