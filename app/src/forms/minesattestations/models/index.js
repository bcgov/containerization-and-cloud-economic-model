const base = require('./base');
const subs = require('./submission');
const searchParms = require('./searchParameters');

module.exports = {...base, ...subs, ...searchParms};
