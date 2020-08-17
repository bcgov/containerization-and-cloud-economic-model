#!/bin/bash
#%
#% Common Forms Toolkit Local Infrastructure quick run
#%
#%  [ENV_FILE=./.env] [VERBOSE=false] THIS_FILE.sh
#%
#%    [TIMEOUT=10] THIS_FILE.sh ./input.csv [./results.csv]
#%
#%  Please create ../app/config/local.json.
#%    Minimal, redacted example: ../app/config/sample-local.json
#%
#%  Request a GETOK Account and password.
#%    https://getok.pathfinder.gov.bc.ca/getok/about
#%
# Prerequisites: Node.js 12, docker, docker compose and python
# https://bcgov.github.io/common-forms-toolkit/local-infrastructure/

# Boilerplate - halt conditions (errors, unsets, non-zero pipes), verbosity and help (w/o params)
#
set -euo pipefail
[ ! "${VERBOSE:-}" == "true" ] || set -x
[ -f "../app/config/local.json" ] && ((!$#)) || {
    grep "^#%" ${0} | sed -e "s/^#%//g" -e "s|THIS_FILE.sh|${0}|g"
    exit
}

# Pick up vars from .env
#
ENV_FILE="${ENV_FILE:-.env}"
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

# Run migrations (script includes check/wait for keycloak service)
#
docker exec comfort_keycloak bash /tmp/keycloak-local-user.sh

# Build and serve in development mode
#
pushd ../app/
npm run all:install
npm run all:build
npm run serve

# Open app
#
(! which python) || python -m webbrowser http://localhost:8080/
