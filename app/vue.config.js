process.env.VUE_APP_VERSION = require('./package.json').version;

const proxyTarget = 'http://localhost:8080';

module.exports = {
  configureWebpack: {
    devServer: {
        clientLogLevel: 'debug',
        watchOptions: {
            poll: true
        }
    }
  },
  publicPath: '/',
  'transpileDependencies': [
    'vuetify'
  ]
};
