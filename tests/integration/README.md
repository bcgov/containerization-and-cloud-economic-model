# Running API Tests with Postman and Newman

## Prerequisites

On your workstation you need to install:

- Postman (https://www.getpostman.com/downloads/)

In the pipeline, you need:

- NodeJS (https://nodejs.org/en/download/)
- Newman (npm install -g newman)

## Steps to run the tests with Postman

1. Open Postman
2. Import the <postman_collection>.json file
3. Run the tests in the collection
4. Review output

## Steps to run the tests with Newman (CLI)

1. In tests/api directory run: (TBD)
2. Review output (TBD)

## Integration in pipeline

Newman is integrated in the pipeline and its output can be directed to Jenkins (or other CI tools).
