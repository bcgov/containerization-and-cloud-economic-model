#!/bin/sh
#
set -euo nounset

# Run migration with retries
#
while !(sleep 5 && npm run migrate); do
  echo "Waiting 10 seconds for Postgres to start"
  sleep 5
done

echo "Migrations complete!  Exiting."
