import '@bcgov/bc-sans/css/BCSans.css';
import '@/assets/scss/style.scss';

import Vue from 'vue';

import App from '@/App.vue';
import getRouter from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

// Globally register all components with base in the name
const requireComponent = require.context('@/components', true, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});

loadConfig();

/**
 * @function initializeApp
 * Initializes and mounts the Vue instance
 * @param {string} [basepath='/'] base server path
 */
function initializeApp(basePath = '/') {

  new Vue({
    router: getRouter(basePath),
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
}

/**
 * @function loadConfig
 * Acquires the configuration state from the backend server
 */
async function loadConfig() {
  // App publicPath is ./ - so use relative path here, will hit the backend server using relative path to root.
  const storageKey = 'config';

  try {

    // Mount the configuration as a prototype for easier access from Vue
    const config = JSON.parse(sessionStorage.getItem(storageKey));
    Vue.prototype.$config = Object.freeze(config);

    initializeApp(config.basePath);
  } catch (err) {
    sessionStorage.removeItem(storageKey);
    initializeApp(); // Attempt to gracefully fail
    throw new Error(`Failed to acquire configuration: ${err.message}`);
  }
}
