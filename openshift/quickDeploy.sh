#!/bin/sh -l
set -euo nounset

# Repo details
GIT_URL="${GIT_URL:-$(git remote get-url origin)}"
GIT_BRANCH="${GIT_BRANCH:-$(git symbolic-ref --short -q HEAD)}"

# URL form https://github.com/<organization>/<repository>
GIT_URL=https://github.com/${GIT_URL#*github.com[:/]} # replace all prefixes
GIT_URL=${GIT_URL%.git}                               # trim trailing .git

# Create secret, if necessary
oc get secret cem-backend -o name ||(
  echo -e "\nSecret not present.  CLIENT_ID and CLIENT_SECRET not found."
  echo -e "\nSign up for credentials at https://getok.nrs.gov.bc.ca.\n"

  read -p "CLIENT_ID [CEM_SERVICE_CLIENT]:" CLIENT_ID
  CLIENT_ID="${CLIENT_ID:-CEM_SERVICE_CLIENT}"
  read -p "CLIENT_SECRET:" CLIENT_SECRET
  echo
  oc process -f backend.secret.yml -p CLIENT_ID=${CLIENT_ID} -p CLIENT_SECRET=${CLIENT_SECRET} | oc apply -f -
)

# Create builds and deployments
oc process -f backend.build.yml -p GIT_URL=${GIT_URL} -p GIT_BRANCH=${GIT_BRANCH} | oc apply -f -
oc process -f frontend.build.yml -p GIT_URL=${GIT_URL} -p GIT_BRANCH=${GIT_BRANCH} | oc apply -f -
oc process -f backend.deploy.yml | oc apply -f -
oc process -f frontend.deploy.yml | oc apply -f -

# Start builds, following the longest (deployments triggered by build completions)
oc start-build cem-backend
oc start-build cem-frontend --follow
