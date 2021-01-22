#!/bin/sh -l
set -euo nounset

# Vars (deploy and tools namespaces)
source ./config.env

# Prompt for confirmation
echo -e "\nThis will destroy all build and deployment files, but not secrets or config maps."
read -p "Enter 'y' to continue: " -n 1 -r RESPONSE
echo

# If confirmed, delete everything (except secrets and config maps)
if [[ ${RESPONSE} =~ [Yy]$ ]]
then
  oc delete all -l app=${APP} -n "${NAMESPACE_DEPLOY}"
  oc delete all -l app=${APP} -n "${NAMESPACE_TOOLS}"
fi
