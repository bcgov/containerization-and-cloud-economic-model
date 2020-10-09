process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  configureWebpack: {
    devServer: {
        clientLogLevel: 'debug',
        watchOptions: {
            poll: true
        }
    }
  },
  devServer: {
    disableHostCheck: true
  },
  publicPath: '/',
  'transpileDependencies': [
    'vuetify'
  ]
};
