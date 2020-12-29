process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      clientLogLevel: 'debug',
      watchOptions: {
        poll: true,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  publicPath: '/',
  transpileDependencies: ['vuetify'],
};
