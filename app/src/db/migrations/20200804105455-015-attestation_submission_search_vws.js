const AGRI_PREFIX = require('../../forms/attestations/agriseafoodopscreening/constants').PREFIX;
const FORESTRY_PREFIX = require('../../forms/attestations/forestrysectoroperatorscreening/constants').PREFIX;
const MINES_PREFIX = require('../../forms/attestations/minesoperatorscreening/constants').PREFIX;

exports.up = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.raw(`create view ${AGRI_PREFIX}_submission_search_vw
            ("submissionId", "createdAt", deleted, "formVersionId", "confirmationId", "operationType", "assignedTo",
             "statusCode", "statusDate", name, city, "operationTypeDisplay", "statusDisplay")
as
SELECT submission."submissionId",
       submission."createdAt",
       submission.deleted,
       submission."formVersionId",
       submission."confirmationId",
       submission."operationType",
       submission."assignedTo",
       submission."statusCode",
       submission."statusDate",
       b.name,
       l.city,
       op.display AS "operationTypeDisplay",
       sc.display AS "statusDisplay"
FROM (SELECT t."submissionId",
             t."createdAt",
             t.deleted,
             t."formVersionId",
             t."confirmationId",
             t."operationType",
             t."assignedTo",
             t."statusCode",
             t."statusDate"
      FROM (SELECT DISTINCT ON (sub."submissionId") sub."submissionId",
                                                    sub."createdAt",
                                                    sub.deleted,
                                                    sub."formVersionId",
                                                    sub."confirmationId",
                                                    sub.type         AS "operationType",
                                                    stat."assignedTo",
                                                    stat.code        AS "statusCode",
                                                    stat."createdAt" AS "statusDate"
            FROM ${AGRI_PREFIX}_submission sub
                     JOIN ${AGRI_PREFIX}_submission_status stat ON stat."submissionId" = sub."submissionId"
            ORDER BY sub."submissionId", stat."createdAt" DESC) t
      ORDER BY t."createdAt" DESC) submission
         JOIN ${AGRI_PREFIX}_submission_business b ON b."submissionId" = submission."submissionId"
         JOIN ${AGRI_PREFIX}_submission_location l ON l."submissionId" = submission."submissionId"
         JOIN ${AGRI_PREFIX}_operation_type op ON op.type::text = submission."operationType"::text
         JOIN ${AGRI_PREFIX}_status_code sc ON sc.code::text = submission."statusCode"::text;`))
    .then(() => knex.schema.raw(`create view ${FORESTRY_PREFIX}_submission_search_vw
            ("submissionId", "createdAt", deleted, "formVersionId", "confirmationId", "operationType", "assignedTo",
             "statusCode", "statusDate", name, city, "operationTypeDisplay", "statusDisplay")
as
SELECT submission."submissionId",
       submission."createdAt",
       submission.deleted,
       submission."formVersionId",
       submission."confirmationId",
       submission."operationType",
       submission."assignedTo",
       submission."statusCode",
       submission."statusDate",
       b.name,
       l.city,
       op.display AS "operationTypeDisplay",
       sc.display AS "statusDisplay"
FROM (SELECT t."submissionId",
             t."createdAt",
             t.deleted,
             t."formVersionId",
             t."confirmationId",
             t."operationType",
             t."assignedTo",
             t."statusCode",
             t."statusDate"
      FROM (SELECT DISTINCT ON (sub."submissionId") sub."submissionId",
                                                    sub."createdAt",
                                                    sub.deleted,
                                                    sub."formVersionId",
                                                    sub."confirmationId",
                                                    sub.type         AS "operationType",
                                                    stat."assignedTo",
                                                    stat.code        AS "statusCode",
                                                    stat."createdAt" AS "statusDate"
            FROM ${FORESTRY_PREFIX}_submission sub
                     JOIN ${FORESTRY_PREFIX}_submission_status stat ON stat."submissionId" = sub."submissionId"
            ORDER BY sub."submissionId", stat."createdAt" DESC) t
      ORDER BY t."createdAt" DESC) submission
         JOIN ${FORESTRY_PREFIX}_submission_business b ON b."submissionId" = submission."submissionId"
         JOIN ${FORESTRY_PREFIX}_submission_location l ON l."submissionId" = submission."submissionId"
         JOIN ${FORESTRY_PREFIX}_operation_type op ON op.type::text = submission."operationType"::text
         JOIN ${FORESTRY_PREFIX}_status_code sc ON sc.code::text = submission."statusCode"::text;`))
    .then(() => knex.schema.raw(`create view ${MINES_PREFIX}_submission_search_vw
            ("submissionId", "createdAt", deleted, "formVersionId", "confirmationId", "assignedTo", "statusCode",
             "statusDate", name, city, "statusDisplay")
as
SELECT submission."submissionId",
       submission."createdAt",
       submission.deleted,
       submission."formVersionId",
       submission."confirmationId",
       submission."assignedTo",
       submission."statusCode",
       submission."statusDate",
       b.name,
       l.city,
       sc.display AS "statusDisplay"
FROM (SELECT t."submissionId",
             t."createdAt",
             t.deleted,
             t."formVersionId",
             t."confirmationId",
             t."assignedTo",
             t."statusCode",
             t."statusDate"
      FROM (SELECT DISTINCT ON (sub."submissionId") sub."submissionId",
                                                    sub."createdAt",
                                                    sub.deleted,
                                                    sub."formVersionId",
                                                    sub."confirmationId",
                                                    stat."assignedTo",
                                                    stat.code        AS "statusCode",
                                                    stat."createdAt" AS "statusDate"
            FROM ${MINES_PREFIX}_submission sub
                     JOIN ${MINES_PREFIX}_submission_status stat ON stat."submissionId" = sub."submissionId"
            ORDER BY sub."submissionId", stat."createdAt" DESC) t
      ORDER BY t."createdAt" DESC) submission
         JOIN ${MINES_PREFIX}_submission_business b ON b."submissionId" = submission."submissionId"
         JOIN ${MINES_PREFIX}_submission_location l ON l."submissionId" = submission."submissionId"
         JOIN ${MINES_PREFIX}_status_code sc ON sc.code::text = submission."statusCode"::text;`));
};

exports.down = function (knex) {
  return Promise.resolve()
    .then(() => knex.schema.raw(`DROP VIEW IF EXISTS ${AGRI_PREFIX}_submission_search_vw`))
    .then(() => knex.schema.raw(`DROP VIEW IF EXISTS ${FORESTRY_PREFIX}_submission_search_vw`))
    .then(() => knex.schema.raw(`DROP VIEW IF EXISTS ${MINES_PREFIX}_submission_search_vw`));
};

