process.env.VUE_APP_VERSION = require('./package.json').version;

const proxyConfig = {
  target: 'http://localhost:8080',
  ws: true,
  changeOrigin: true
};

module.exports = {
  publicPath: process.env.FRONTEND_BASEPATH ? process.env.FRONTEND_BASEPATH : '/app',
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': proxyConfig,
      '/config': proxyConfig
    }
  }
};
