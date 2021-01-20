#!/bin/sh -l
set -euo nounset

GIT_BRANCH=${GIT_BRANCH:-$(git symbolic-ref --short -q HEAD)}

oc get secret cem-backend -o name ||(
  echo -e "\nSecret not present.  CLIENT_ID and CLIENT_SECRET not found."
  echo -e "\nSign up for credentials at https://getok.nrs.gov.bc.ca.\n"

  read -p "CLIENT_ID [CEM_SERVICE_CLIENT]:" CLIENT_ID
  CLIENT_ID="${CLIENT_ID:-CEM_SERVICE_CLIENT}"
  read -p "CLIENT_SECRET:" CLIENT_SECRET
  echo
  oc process -f backend.secret.yml -p CLIENT_ID=${CLIENT_ID} -p CLIENT_SECRET=${CLIENT_SECRET} | oc apply -f -
)

oc process -f backend.build.yml -p GIT_BRANCH=${GIT_BRANCH} | oc apply -f -
oc process -f backend.deploy.yml | oc apply -f -
oc process -f frontend.build.yml -p GIT_BRANCH=${GIT_BRANCH} | oc apply -f -
oc process -f frontend.deploy.yml | oc apply -f -

oc start-build cem-backend
oc start-build cem-frontend --follow
