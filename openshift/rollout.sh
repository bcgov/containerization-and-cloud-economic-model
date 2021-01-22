#!/bin/sh -l
set -euxo nounset

# Vars (git branch, tools namespace)
GIT_BRANCH="$(git symbolic-ref --short -q HEAD)"
source ./config.env

# Initialize with secret, if necessary
./init.sh

# Create builds and deployments
oc process -f backend.yml -p GIT_BRANCH=${GIT_BRANCH} --param-file=config.env | oc apply -f -
oc process -f frontend.yml -p GIT_BRANCH=${GIT_BRANCH} --param-file=config.env | oc apply -f -

# Start builds, following the longest (deployments triggered by build completions)
oc start-build cem-backend -n ${NAMESPACE_TOOLS}
oc start-build cem-frontend -n ${NAMESPACE_TOOLS} --follow
