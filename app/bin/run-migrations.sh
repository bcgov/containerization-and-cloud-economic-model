#!/bin/sh
#
set -euo nounset

# Run migration with retries
#
while !(sleep 5 && npm run migrate); do
  echo "Retrying database migration in 10 seconds"
  sleep 5
done

echo "Migrations complete!  Exiting."
