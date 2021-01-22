#!/bin/sh -l
set -euo nounset

# OpenShift details
NAMESPACE_DEPLOY=csnr-devops-lab-deploy

# Create secret, if necessary
if(oc get secret cem-backend -o name -n ${NAMESPACE_DEPLOY})
then
  echo -e "\nAlready initialized.  Secret exists.\n"
else
  echo -e "\nSecret not present.  CLIENT_ID and CLIENT_SECRET not found."
  echo -e "\nSign up for credentials at https://getok.nrs.gov.bc.ca.\n"

  read -p "CLIENT_ID [CEM_SERVICE_CLIENT]:" CLIENT_ID
  CLIENT_ID="${CLIENT_ID:-CEM_SERVICE_CLIENT}"
  read -p "CLIENT_SECRET:" CLIENT_SECRET
  echo
  oc process -f init.yml -p CLIENT_ID=${CLIENT_ID} -p CLIENT_SECRET=${CLIENT_SECRET} --param-file=config.env | oc apply -f -
fi
