#!/bin/bash
#
# Prerequisites: docker, docker compose and python
# https://bcgov.github.io/common-forms-toolkit/local-infrastructure/
#
set -euo pipefail

# Default env file, can be overridden (VAR=something ./run.sh)
#
ENV_FILE="${ENV_FILE:-.env}"

# Pick up vars from .env, if exists
#
[ ! -f "${ENV_FILE}" ] || source ./.env
KEY_PORT=${KEYCLOAK_HOST_HTTP_PORT:-28080}

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

# If python3 is installed then browse to keycloak
#
(! which python) || python -m webbrowser http://localhost:28080/
