const PREFIX = require('../../forms/attestations/minesoperatorscreening/constants').PREFIX;

exports.up = function(knex) {
  return Promise.resolve()
    .then(() => {
      const data = {
        name: 'accessRequestedEmail',
        enabled: true,
        config: {
          template: 'access-requested-email.html',
          from: 'MCAD.RegionalOps@gov.bc.ca',
          to: 'NR.CommonServiceShowcase@gov.bc.ca',
          subject: 'Industrial Camps - Access Requested',
          title: 'Access Requested',
          priority: 'normal',
          message: 'A request for access has been received for your Mines Operator Screening administration page.',
          messageLinkText: 'Please Login to view the Access Request(s).',
          messageLinkUrl: 'https://comfort-dev.pathfinder.gov.bc.ca/app/minesoperatorscreening/admin/team'
        },
        createdBy: 'migration-008'
      };
      return knex(`${PREFIX}_settings`).insert(data);
    });
};

exports.down = function(knex) {
  return knex(`${PREFIX}_settings`).where('name', 'accessRequestedEmail').del();
};
