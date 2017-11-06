const _ = require('lodash');

const production = require('./production');
const qa = require('./qa');
const development = require('./development');

// All configurations will extend these options
// ============================================
const defaults = {
  env: process.env.NODE_ENV || 'development',

  // Server port
  port: process.env.PORT || 3001,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Domain name
  hostname: process.env.HOSTNAME || 'localhost',

  // postgres
  pg: {
    client: 'pg',
    connection: {
      host: '',
      port: 5432,
      database: '',
      user: '',
      password: ''
    },
    useNullAsDefault: true
  }
};

let envConfig = {};
switch (defaults.env) {
  case 'production':
    envConfig = production;
    break;
  case 'qa':
    envConfig = qa;
    break;
  default:
    envConfig = development;
    break;
}

// Export the config object based on the NODE_ENV
// ==============================================
const config = _.merge(
  defaults,
  envConfig || {}
);

console.log(config);

module.exports = config;
